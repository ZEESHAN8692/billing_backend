import Purchase from "../model/purchaseModel.js";
import Product from "../model/productModel.js";

class PurchaseController {
  async addPurchase(req, res) {
    try {
      const { product, quantity, purchasePrice, supplier } = req.body;

      // 1. Create purchase record
      const purchase = new Purchase({
        product,
        quantity,
        purchasePrice,
        supplier,
      });
      await purchase.save();

      // 2. Update product stock
      const existingProduct = await Product.findById(product);
      if (!existingProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      existingProduct.stockQty += quantity;
      await existingProduct.save();

      res.status(201).json({
        success: true,
        message: "Purchase added successfully",
        data: purchase,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding purchase", error });
    }
  }

  async getAllPurchases(req, res) {
    try {
      const purchases = await Purchase.find()
        .populate("product", "name price")
        .sort({ purchaseDate: -1 });

      res.json({
        success: true,
        message: "Purchases fetched successfully",
        data: purchases,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching purchases", error });
    }
  }

  async getSinglePurchase(req, res) {
    try {
      const purchase = await Purchase.findById(req.params.id).populate(
        "product"
      );
      if (!purchase) {
        return res
          .status(404)
          .json({ success: false, message: "Purchase not found" });
      }
      res.json({ success: true, purchase });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching purchase", error });
    }
  }

  async updatePurchase(req, res) {
    try {
      const { product, quantity, purchasePrice, supplier } = req.body;

      const oldPurchase = await Purchase.findById(req.params.id);
      if (!oldPurchase) {
        return res
          .status(404)
          .json({ success: false, message: "Purchase not found" });
      }

      const productRef = await Product.findById(oldPurchase.product);

      // Revert old stock
      if (productRef) {
        productRef.stockQty -= oldPurchase.quantity;
      }

      // Update purchase fields
      oldPurchase.product = product;
      oldPurchase.quantity = quantity;
      oldPurchase.purchasePrice = purchasePrice;
      oldPurchase.supplier = supplier;
      await oldPurchase.save();

      // Add new stock
      if (productRef) {
        productRef.stockQty += quantity;
        await productRef.save();
      }

      res.json({ success: true, updatedPurchase: oldPurchase });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error updating purchase", error });
    }
  }

  async deletePurchase(req, res) {
    try {
      const purchase = await Purchase.findById(req.params.id);
      if (!purchase) {
        return res
          .status(404)
          .json({ success: false, message: "Purchase not found" });
      }

      // Rollback stock
      const product = await Product.findById(purchase.product);
      if (product) {
        product.stockQty -= purchase.quantity;
        await product.save();
      }

      await Purchase.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Purchase deleted and stock rolled back",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error deleting purchase", error });
    }
  }
}

export default new PurchaseController();
