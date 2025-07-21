import mongoose from "mongoose";

const authenticationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: [String, "password is required"],
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["accountant", "admin"],
    default: "accountant",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Authentication", authenticationSchema);
