import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  apps: [
    {
      name: 'backend',
      script: 'index.js', // or app.js or main backend entry
      instances: 1,
      autorestart: true,
      watch: false,
    }
  ]
};
