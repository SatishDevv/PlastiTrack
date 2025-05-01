module.exports = {
    apps: [
      {
        name: 'server',
        script: 'server.js', // or app.js or main backend entry
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'development',
          PORT: 8080
        }
      }
    ]
  };
  