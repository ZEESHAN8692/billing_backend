import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      taxRate: { type: Number, default: 0 },
    },
  ],
  totalAmount: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid", "Partial"],
    default: "Unpaid",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Debit Card"],
    default: "Cash",
  },
});

export default mongoose.model("Invoice", invoiceSchema);
