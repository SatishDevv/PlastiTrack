import dotenv from "dotenv";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import path, { dirname } from "path";
import sendMail from "../utils/sendMail.js";
import { createActivationToken } from "../utils/createActivationToken.js";
import {
  activateUserSchema,
  createUserSchemaValidations,
  loginUserSchema,
  registerSchema,
} from "../validations/user.validations.js";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";
// import redis from "../utils/redis.js";
import { containerAssignmentValidations } from "../validations/containerAssignment.validations.js";
import mongoose from "mongoose";

dotenv.config();

export const registrationsUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Pass the data to the validation.
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(new ErrorHandler(error.message, 400));
    }

    // Check the mail exist or not
    const isEmailExist = await userModel.findOne({ email });

    // If it is exist then return
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };

    const __dirname = dirname(fileURLToPath(import.meta.url));

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account ...",
        template: "activation-mail.ejs",
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

// activate user
export const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    // Pass the data to the validation.
    const { error } = activateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(
        new ErrorHandler(
          error.details.map((err) => err.message).join(", "),
          400
        )
      );
    }

    const { activation_code, activation_token } = req.body;

    console.log(process.env.ACTIVATION_SECRET);

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log(newUser);

    if (newUser.activationCode !== activation_code) {
      return new ErrorHandler("Invalid Activation Code", 400);
    }

    const { name, email, password } = newUser.user;

    // check the email is already exits or not
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return new ErrorHandler("Email already exist", 400);
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return new ErrorHandler("error.message", 400);
  }
});

// login user
export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body, {
      abortEarly: false,
    });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(
        new ErrorHandler(
          error.details.map((err) => err.message).join(", "),
          400
        )
      );
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    console.log(user);

    if (!user) {
      return next(new ErrorHandler("Invalid user name or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid user name or password", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// export const loginUser = CatchAsyncError(async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next(new ErrorHandler("Please enter email and password", 400));
//     }

//     // Find user with role & permissions
//     const user = await userModel
//       .findOne({ email })
//       .select("+password")
//       .populate({
//         path: "roleId",
//         model: "Role",
//         select: "roleName claims",
//       });

//     if (!user) {
//       return next(new ErrorHandler("Invalid username or password", 400));
//     }

//     // Verify password
//     const isPasswordMatch = await user.comparePassword(password);
//     if (!isPasswordMatch) {
//       return next(new ErrorHandler("Invalid username or password", 400));
//     }

//     // Extract user permissions
//     const permissions = user.roleId?.claims || [];

//     // Attach user permissions to the response
//     sendToken(
//       { user, permissions }, // Include permissions in the token
//       200,
//       res
//     );
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

// logout User
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token.
export const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token ", refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

const generateHashedPassword = async () => {
  const randomPassword = crypto.randomBytes(4).toString("hex"); // 16-character random password
  const hashedPassword = await bcrypt.hash(randomPassword, 10);
  return { rawPassword: randomPassword, hashedPassword };
};

//Create user
export const createUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const users = req.body;
    if (!Array.isArray(users) || users.length === 0) {
      return next(new ErrorHandler("At least one user must be provided", 400));
    }

    const usersWithPasswords = await Promise.all(
      users.map(async (user) => {
        const { rawPassword, hashedPassword } = await generateHashedPassword();
        console.log(rawPassword, hashedPassword);

        // Send email with user credentials using EJS template
        await sendMail({
          email: user.email,
          subject: "Your Account Credentials",
          template: "userCrediantials-mail.ejs", // in mails
          data: {
            name: user.firstName || "User",
            email: user.email,
            password: rawPassword,
          },
        });
        return { ...user, password: hashedPassword };
      })
    );
    console.log(usersWithPasswords);

    const { error } = createUserSchemaValidations(usersWithPasswords);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const data = await userModel.insertMany(usersWithPasswords);
    res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// forgotPassword controller: generates token, sends email with reset link
export const forgotPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save({ validateBeforeSave: false });

    const origin = process.env.ORIGIN?.split(",")[0]
      .replace(/["[\]]/g, "")
      .trim();
    const resetUrl = `${origin}/api/v1/user/form/resetPassword/${resetToken}`;
    console.log(resetUrl);

    const messageData = {
      name: user.firstName,
      email: user.email,
      resetUrl,
    };

    try {
      await sendMail({
        email: user.email,
        subject: "Reset your password",
        template: "resetLink-mail.ejs",
        data: messageData,
      });

      res.status(200).json({ message: `Reset link sent to ${user.email}` });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler("Failed to send email", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// resetPasswordWithLink controller: handles password reset form submission
export const resetPasswordWithLink = CatchAsyncError(async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
      return next(
        new ErrorHandler("Passwords do not match or are missing", 400)
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return next(new ErrorHandler("Token is invalid or expired", 400));

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.render("resetSuccess", {
      title: "Password Reset Successful",
      message: "Your password has been reset successfully.",
      loginUrl: process.env.FRONTEND_URL + "/login",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// getResetPasswordPage controller: renders reset form if token is valid
export const getResetPasswordPage = CatchAsyncError(async (req, res, next) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).render("error-page", {
        title: "Reset Error",
        message: "Reset link is invalid or expired.",
      });
    }

    res.render("resetPasswordForm", {
      title: "Reset Your Password",
      token: req.params.token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all users excluding deleted users
export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await userModel.find({ isDeleted: false }); // Exclude deleted users
    res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get user by Id
export const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    console.log("loooo");

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid User Id", 404));
    }
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

//Update user
export const updateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      GSTNO,
      responsiblePersonName,
      responsiblePersonContactNo,
      responsiblePersonEmailId,
      consumerId,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid user ID", 404));
    }
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

// Delete User by Id
export const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not Found or ID is incorrect", 404));
    }

    // Perform soft delete by setting isDeleted to true
    user.isDeleted = true;
    await user.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// restore user
export const restoreUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user || !user.isDeleted) {
      return next(new ErrorHandler("User not found or already active", 404));
    }

    user.isDeleted = false;
    await user.save();
    res.status(200).json({ message: "User restored successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
