// import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redis = new Redis({
//   host: process.env.REDIS_HOST || "", // Redis server address
//   port: process.env.REDIS_PORT || 6379, // Redis default port
//   password: process.env.REDIS_PASSWORD || "", // Add password if set
//   tls: process.env.REDIS_TLS ? {} : undefined, // Enable TLS if needed
// });

// redis.on("connect", () => {
//   console.log("✅ Connected to Redis");
// });

// redis.on("error", (err) => {
//   console.error("  Redis Error:", err);
// });

// export default redis;