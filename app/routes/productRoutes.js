import express from "express";
const router = express.Router();
import productController from "../controller/productController.js";
import { AuthCheck } from "../middleware/authCheck.js";

router.post("/add-product",AuthCheck, productController.addProduct);
router.get("/list-product",AuthCheck, productController.getAllProduct);
router.get("product/:id",AuthCheck, productController.getSingleProduct);
router.put("/update-product/:id",AuthCheck, productController.updateProduct);
router.delete("/delete-product/:id",AuthCheck, productController.deleteProduct);

export default router;
