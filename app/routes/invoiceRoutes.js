import express from "express";
import invoiceController from "../controller/invoiceController.js";
const router = express.Router();

router.post("/add-invoice", invoiceController.addInvoice);
router.get("/list-invoice", invoiceController.getAllInvoices);
router.get("invoice/:id", invoiceController.getSingleInvoice);
router.put("/update-invoice/:id", invoiceController.updateInvoice);
router.delete("/delete-invoice/:id", invoiceController.deleteInvoice);

export default router;
