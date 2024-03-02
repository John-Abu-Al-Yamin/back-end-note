import User from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide an email and password",
    });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a valid email" });
  }

  if (password.length < "8") {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a Strong Password" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(200)
        .json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const saveduser = await new User({
      email,
      password: hashedPassword,
    }).save();
    const token = genrateToken(saveduser._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "please provide an email and password" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: "please provide an valid email" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, error: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "invalid credentials" });
    }
    const token = genrateToken(userExists._id);
    res.status(400).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
