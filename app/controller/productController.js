import Product from "../model/productModel.js";
class ProductController {
  async addProduct(req, res) {
    try {
      const { name, sku, hsncode, description, price, taxRate, stockQty } =
        req.body;
      const newProduct = new Product({
        name,
        sku,
        hsncode,
        description,
        price,
        taxRate,
        stockQty,
      });
      const savedProduct = await newProduct.save();
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: savedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding product", error });
    }
  }

  async getAllProduct(req, res) {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json({
        status: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching products", error });
    }
  }

  async getSingleProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching product", error });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({
        status: true,
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error updating product", error });
    }
  }

  async deleteProduct(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error deleting product", error });
    }
  }
}

export default new ProductController();
