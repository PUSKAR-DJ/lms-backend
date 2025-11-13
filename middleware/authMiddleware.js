import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * Middleware to protect routes by verifying JWT.
 * Attaches the user to req.user if authenticated.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach to request
      // Exclude the password from the user object
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * Middleware to authorize routes based on user role.
 * Pass allowed roles as arguments.
 * e.g., authorize('admin', 'teacher')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user is attached by the 'protect' middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }
    next();
  };
};