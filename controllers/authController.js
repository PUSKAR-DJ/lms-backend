import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user
    // The password will be automatically hashed by the pre-save hook in user.js
    const user = new User({
      name,
      email,
      password,
      role: role || "student", // Default role to 'student' if not provided
    });

    await user.save();

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Respond with token
    res.status(201).json({
      token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 *access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check for user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if password is valid
    // Compare plain text password with the hashed password in the database
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Respond with token
    res.json({
      token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};