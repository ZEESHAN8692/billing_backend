import userModel from "../../model/authentication/authenticationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { comparePassword, hsahePassword } from "../../middleware/authCheck.js";
import dotenv from "dotenv";
dotenv.config();

class AuthenticationController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const image = `${baseUrl}/uploads/${req.file?.filename}`;

      if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await hsahePassword(password);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        image,
        role: role || "accountant",
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "All fields are required" });

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async profile(req, res) {
    try {
      const user = await userModel.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async users(req, res) {
    try {
      const users = await userModel.find();
      res.status(200).json({
        status: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async singleUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      res.status(200).json({
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AuthenticationController();
