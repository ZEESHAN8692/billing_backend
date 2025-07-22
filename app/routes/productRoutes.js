import express from "express";
const router = express.Router();
import productController from "../controller/productController.js";

router.post("/add-product", productController.addProduct);
router.get("/list-product", productController.getAllProduct);
router.get("product/:id", productController.getSingleProduct);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);

export default router;
