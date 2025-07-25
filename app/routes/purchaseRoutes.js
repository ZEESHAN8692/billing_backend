import express from "express";
import purchaseController from "../controller/purchaseController.js";
import { AuthCheck } from "../middleware/authCheck.js";
const router = express.Router();

router.post("/add-purchase",AuthCheck, purchaseController.addPurchase);
router.get("/list-purchases",AuthCheck, purchaseController.getAllPurchases);
router.get("purchase/:id", purchaseController.getSinglePurchase);
router.delete("/delete-purchase/:id", purchaseController.deletePurchase);
router.put("/update-purchase/:id",AuthCheck, purchaseController.updatePurchase);

export default router;
