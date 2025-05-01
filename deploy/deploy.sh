#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting deployment..."

# Set paths
REPO_DIR="/home/PlastiTrack"
FRONTEND_DIR="$REPO_DIR/client"
BACKEND_DIR="$REPO_DIR/server"
NGINX_ROOT="/var/www/plastTrack"

# Function to exit on error
function exit_on_error() {
  echo "❌ $1"
  exit 1
}

# Validate directories
[ -d "$REPO_DIR" ] || exit_on_error "Repository directory not found: $REPO_DIR"
[ -d "$FRONTEND_DIR" ] || exit_on_error "Frontend directory not found: $FRONTEND_DIR"
[ -d "$BACKEND_DIR" ] || exit_on_error "Backend directory not found: $BACKEND_DIR"

# Pull latest code
cd "$REPO_DIR" || exit_on_error "Failed to access repository directory"
echo "📥 Pulling latest changes from develop branch..."
git checkout develop || exit_on_error "Failed to checkout develop branch"
git pull origin develop || exit_on_error "Failed to pull latest code"
echo "🔄 Code updated to latest version"

# Install and build frontend
cd "$FRONTEND_DIR" || exit_on_error "Failed to access frontend directory"
echo "🔧 Installing frontend dependencies..."
npm install || exit_on_error "Failed to install frontend dependencies"

echo "🛠️ Building frontend..."
npm run build || exit_on_error "Frontend build failed"

# Deploy frontend to Nginx
echo "📂 Copying frontend build to Nginx root..."
sudo rm -rf "$NGINX_ROOT/*" || exit_on_error "Failed to clean Nginx root"
sudo cp -r dist/* "$NGINX_ROOT/" || exit_on_error "Failed to copy frontend build to Nginx root"

# Install backend dependencies
cd "$BACKEND_DIR" || exit_on_error "Failed to access backend directory"
echo "🔧 Installing backend dependencies..."

if [ ! -f .env ]; then
  echo "📦 Creating .env file from .env.example..."
  sudo cp -r .env.example .env || exit_on_error "Failed to copy .env file"
fi

npm install || exit_on_error "Failed to install backend dependencies"

# Restart backend using PM2
echo "🔄 Restarting backend with PM2..."
pm2 restart my-api || exit_on_error "PM2 restart failed"

# Restart Nginx server
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx || exit_on_error "Failed to restart Nginx"

echo "✅ Deployment complete!"
