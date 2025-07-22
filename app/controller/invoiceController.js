import Invoice from "../model/invoiceModel.js";
import Product from "../model/productModel.js";

class InvoiceController {
  async addInvoice(req, res) {
    try {
      const { customer, products, paymentStatus, paymentMethod } = req.body;

      let totalAmount = 0;

      for (let item of products) {
        const product = await Product.findById(item.product);
        if (!product)
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.product}`,
          });

        const tax = (item.price * item.taxRate) / 100;
        totalAmount += (item.price + tax) * item.quantity;

        // Reduce stock
        product.stockQty -= item.quantity;
        if (product.stockQty < 0) product.stockQty = 0;
        await product.save();
      }

      const invoice = new Invoice({
        customer,
        products,
        totalAmount,
        paymentStatus,
        paymentMethod,
      });

      await invoice.save();

      res.status(201).json({ success: true, invoice });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error creating invoice", error });
    }
  }

  async getAllInvoices(req, res) {
    try {
      const invoices = await Invoice.find()
        .populate("customer", "name phone")
        .populate("products.product", "name price")
        .sort({ invoiceDate: -1 });

      res.json({ success: true, invoices });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching invoices", error });
    }
  }

  async getSingleInvoice(req, res) {
    try {
      const invoice = await Invoice.findById(req.params.id)
        .populate("customer")
        .populate("products.product");

      if (!invoice) {
        return res
          .status(404)
          .json({ success: false, message: "Invoice not found" });
      }

      res.json({ success: true, invoice });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching invoice", error });
    }
  }

  async updateInvoice(req, res) {
    try {
      const { customer, products, paymentStatus, paymentMethod } = req.body;

      const oldInvoice = await Invoice.findById(req.params.id);
      if (!oldInvoice) {
        return res
          .status(404)
          .json({ success: false, message: "Invoice not found" });
      }

      // 1. Rollback stock from old invoice
      for (let item of oldInvoice.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQty += item.quantity;
          await product.save();
        }
      }

      // 2. Apply new invoice data
      let totalAmount = 0;

      for (let item of products) {
        const product = await Product.findById(item.product);
        if (!product)
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.product}`,
          });

        const tax = (item.price * item.taxRate) / 100;
        totalAmount += (item.price + tax) * item.quantity;

        product.stockQty -= item.quantity;
        if (product.stockQty < 0) product.stockQty = 0;
        await product.save();
      }

      // 3. Update invoice
      oldInvoice.customer = customer;
      oldInvoice.products = products;
      oldInvoice.paymentStatus = paymentStatus;
      oldInvoice.paymentMethod = paymentMethod;
      oldInvoice.totalAmount = totalAmount;

      await oldInvoice.save();

      res.json({ success: true, updatedInvoice: oldInvoice });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error updating invoice", error });
    }
  }

  async deleteInvoice(req, res) {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res
          .status(404)
          .json({ success: false, message: "Invoice not found" });
      }

      // Rollback stock
      for (let item of invoice.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQty += item.quantity;
          await product.save();
        }
      }

      // Delete invoice
      await Invoice.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Invoice deleted and stock restored",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error deleting invoice", error });
    }
  }
}

export default new InvoiceController();
