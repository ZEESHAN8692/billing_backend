import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  gstNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Customer", customerSchema);
