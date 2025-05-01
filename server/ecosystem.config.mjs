export default {
  apps: [
    {
      name: "plastiTrack",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
