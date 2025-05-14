import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: false, // Optional for OAuth users
    },
    googleId: {
      type: String,
      required: false, // Only for Google OAuth users
    },
    githubId: {
  type: String,
  required: false,
},
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt automatically
  }
);

// ✅ Avoid model overwrite errors in development (hot-reloading)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
