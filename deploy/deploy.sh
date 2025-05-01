#!/bin/bash

set -e  # Stop script on error
echo "🚀 Starting deployment..."

# Set paths
REPO_DIR="/home/PlastiTrack"
FRONTEND_DIR="$REPO_DIR/client"
BACKEND_DIR="$REPO_DIR/server"
NGINX_ROOT="/var/www/plastTrack"


# Pull latest code
cd "$REPO_DIR"
echo "📥 Pulling latest changes from develop branch..."
git checkout develop
git pull origin develop
echo "🔄 Code updated to latest version"

# Install and build frontend
echo "🔧 Installing frontend dependencies..."
cd "$FRONTEND_DIR"
npm install

echo "🛠️ Building frontend..."
npm run build

# Deploy frontend to Nginx (optional)
echo "📂 Copying frontend build to Nginx root..."
sudo rm -rf "$NGINX_ROOT/*"
sudo cp -r dist/* "$NGINX_ROOT/"

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd "$BACKEND_DIR"
echo "📦 env file..."
sudo cp -r .env.example .env
npm install

# Restart backend using PM2
echo "🔄 Restarting backend with PM2..."
pm2 start server.js --name plastiTrack --env production
# Restart Nginx server
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx



echo "✅ Deployment complete!"
