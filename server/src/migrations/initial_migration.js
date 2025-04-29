import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../utils/db.js";
import userModel from "../models/user.model.js";
import roleModel from "../models/role.model.js"; // Import Role model
import pageModel from "../models/pages.model.js";
import { logger } from "../utils/logger.js";

const runMigration = async () => {
  try {
    await connectDB(); // Ensure database is connected

    // Check if Admin role exists
    let adminRole = await roleModel.findOne({ roleName: "admin" });

    if (!adminRole.length) {
      // Create Admin Role with Permissions
      adminRole = await roleModel.create({
        roleName: "admin",
        claims: [
          { actionId: "1", claimType: "CREATE", claimValue: "USERS_CREATE", pageId: "c08d1303" },
          { actionId: "2", claimType: "READ", claimValue: "USERS_VIEW", pageId: "c08d1303" },
        ],
      });
      logger.info("✅ Admin role created");
    } else {
      logger.info("✅ Admin role already exists");
    }

    // Check if Admin user exists
    const adminUser = await userModel.findOne({ email: "admin@example.com" });

    if (adminUser) {
      logger.info("✅ Admin user already exists");
      // process.exit(0);
      return;
    } else {
      // Create Admin User with the correct role
      await userModel.create({
        firstName: "admin",
        lastName: "admin",
        email: "admin@example.com",
        contactNo: "1234567890",
        roleId: adminRole._id, // Assign the dynamically created role
        password: "admin@123",
      });

      logger.info("✅ Admin user created");
    }


    

    // Upsert Pages
    const pages = [
      {
        Name: "Settings",
        Order: 1,
        CreatedDate: new Date(),
        CreatedBy: "4b352b37-332a-40c6-ab05-e38fcf109719",
      },
      {
        Name: "Dashboard",
        Order: 2,
        CreatedDate: new Date(),
        CreatedBy: "4b352b37-332a-40c6-ab05-e38fcf109719",
      },
    ];

    for (const page of pages) {
      await pageModel.create(
        { _id: page._id },
        page,
        { upsert: true, new: true }
      );
    }

    logger.info("✅ Pages migrated successfully!");
    console.log("✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
};

runMigration();
