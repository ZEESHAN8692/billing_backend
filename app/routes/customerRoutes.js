import express from "express";
import customerController from "../controller/customerController.js";
const router = express.Router();

router.post("/customer-add", customerController.addCustomer);
router.get("/customer-list", customerController.getAllCustomer);
router.get("customer/:id", customerController.getSingleCustomer);
router.put("/update-customer/:id", customerController.updateCustomer);
router.delete("/delete-customer/:id", customerController.deleteCustomer);

export default router;
