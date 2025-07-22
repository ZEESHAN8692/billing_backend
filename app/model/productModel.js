import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  sku: { type: String },
  hsncode: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  taxRate: { type: Number, default: 0 },
  stockQty: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
