import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "Your Must be logged in",
    });
  }

  const token = authorization.replace('Bearer ','');

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: "You must be Logged in",
      });
    }
    const { id } = payload;
    req.userId = id;

    next();
  });
};
