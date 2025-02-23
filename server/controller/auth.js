import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  const data = req.body;

  if (!data?.email || !data?.password) {
    return next(createError(400, "Email and password are required"));
  }
  await connectToDB();
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) {
    return next(createError(400, "User already registered"));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    ...req.body,
    password: hash,
  });
  await newUser.save();

  res.status(201).json({
    message: "User created successfully",
  });
};
export const login = async (req, res, next) => {
  const data = req.body;

  if (!data?.email || !data?.password) {
    return next(createError(400, "Email and password are required"));
  }
  await connectToDB();
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return next(createError(400, "Invalid email or password"));
  }
  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) return next(createError(400, "Invalid password"));
  // generate a jwt token
  const token = jwt.sign({ id: user._id }, process.env.JWT);

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      message: "Logged in successfully",
    });
};
export const logout = async (req, res, next) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      message: "Logged out successfully",
    });
};
