import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL || "";

const connectDB = async () => {
  try {


    await mongoose.connect(dbUrl).then((data) => {
      console.log(`✅ DataBase connected success ${data.connection.host}`);
    });

        // Run migrations only after successful connection
    // if (process.env.RUN_MIGRATIONS === "true") {
    //   console.log("🚀 Running migrations...");
    //   await import("../migrations/initial_migration.js");
    // }
  } catch (error) {
    console.log("❌ "+ error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
