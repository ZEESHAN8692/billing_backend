import express from "express";
import connectDB from "./app/config/database.js";
import cors from "cors";
import router from "./app/routes/Athentication/authenticationRoutes.js";
import invoiceRoutes from "./app/routes/invoiceRoutes.js";
import productRoutes from "./app/routes/productRoutes.js";
import customerRoutes from "./app/routes/customerRoutes.js";
import purchaseRoutes from "./app/routes/purchaseRoutes.js";

const app = express();
// Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", router);
app.use("/api", invoiceRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", purchaseRoutes);

// Server
const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
