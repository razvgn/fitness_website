import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authentication = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Acces neautorizat. Tokenul a fost invalid.");
    }
  } else {
    res.status(401);
    throw new Error("Acces neautorizat. Tokenul nu a fost menționat.");
  }
});

const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Nu ai permisiune de administrator.");
  }
};

export { authentication, authorizedAdmin };
