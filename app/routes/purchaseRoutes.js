import express from "express";
import purchaseController from "../controller/purchaseController.js";
const router = express.Router();

router.post("/add-purchase", purchaseController.addPurchase);
router.get("/list-purchases", purchaseController.getAllPurchases);
router.get("purchase/:id", purchaseController.getSinglePurchase);
router.delete("/delete-purchase/:id", purchaseController.deletePurchase);
router.put("/update-purchase/:id", purchaseController.updatePurchase);

export default router;
