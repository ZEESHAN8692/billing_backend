import express from "express";
import invoiceController from "../controller/invoiceController.js";
import { AuthCheck } from "../middleware/authCheck.js";
const router = express.Router();

router.post("/add-invoice", AuthCheck, invoiceController.addInvoice);
router.get("/list-invoice", AuthCheck, invoiceController.getAllInvoices);
router.get("/invoice/:id", AuthCheck, invoiceController.getSingleInvoice);
router.put("/update-invoice/:id", AuthCheck, invoiceController.updateInvoice);
router.delete(
  "/delete-invoice/:id",
  AuthCheck,
  invoiceController.deleteInvoice
);

export default router;
