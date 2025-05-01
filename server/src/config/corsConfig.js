import cors from 'cors';

export const configureCors = () => {
  let allowedOrigins = [];

  try {
    allowedOrigins = JSON.parse(process.env.ORIGIN || '[]');
  } catch (error) {
    console.error('❌ Failed to parse ORIGIN env variable:', error.message);
  }

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });
};
