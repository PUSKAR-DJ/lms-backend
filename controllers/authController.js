import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // JWT token generation
    const token = jwt.sign({ number: user.number }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).jso({
      message: "Login Successful",
      user:{
        role: user.role,
        token: token,
      }
    })
  } catch (error) {
    console.error("Error logging in user : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
