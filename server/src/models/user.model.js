// import("dotenv").config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern = /^[^\s@]+@[^\@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    contactNo: {
      type: String,
      // required:["Please enter your contact number"],
      //unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    city: {
      type: String,
      // required:["Please enter your city name",]
    },
    state: {
      type: String,
      // required:["Please enter your state name"],
    },
    GSTNO: {
      type: String,
      // required: ["Please enter your GST No."],
    },
    responsiblePersonName: {
      type: String,
    },
    responsiblePersonContactNo: {
      type: String,
      // required:["Please enter your contact number"],
      //unique: true,
    },
    responsiblePersonEmailId: {
      type: String,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      //required: true,
    },
    roleName: {
      type: String,
      //required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    consumerId: {
      type: String,
      // required: true,
    },
    vendorId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    isAuthenticated: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign refreshToken
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// const userModel = Model<IUser> = mongoose.model("User",userSchema);

const userModel = mongoose.model("User", userSchema);

export default userModel;
