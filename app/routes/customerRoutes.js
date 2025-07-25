import express from "express";
import customerController from "../controller/customerController.js";
import { AuthCheck } from "../middleware/authCheck.js";
const router = express.Router();

router.post("/customer-add",AuthCheck, customerController.addCustomer);
router.get("/customer-list",AuthCheck, customerController.getAllCustomer);
router.get("customer/:id",AuthCheck, customerController.getSingleCustomer);
router.put("/update-customer/:id",AuthCheck, customerController.updateCustomer);
router.delete("/delete-customer/:id",AuthCheck, customerController.deleteCustomer);

export default router;
