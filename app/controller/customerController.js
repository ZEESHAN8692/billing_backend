import Customer from "../model/customerModel.js";

class CustomerController {
  async addCustomer(req, res) {
    try {
      const { name, email, phone, address, gstNumber } = req.body;
      const newCustomer = new Customer({
        name,
        email,
        phone,
        address,
        gstNumber,
      });
      const savedCustomer = await newCustomer.save();
      res.status(201).json({
        success: true,
        message: "Customer added successfully",
        data: savedCustomer,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding customer", error });
    }
  }
  async getAllCustomer(req, res) {
    try {
      const customers = await Customer.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        message: "Customers fetched successfully",
        data: customers,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch customers", error });
    }
  }
  async getSingleCustomer(req, res) {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer not found" });
      }
      res.json({
        success: true,
        message: "Customer fetched successfully",
        customer,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching customer", error });
    }
  }

  async updateCustomer(req, res) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!customer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer not found" });
      }
      res.json({
        success: true,
        message: "Customer updated successfully",
        customer,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error updating customer", error });
    }
  }

  async deleteCustomer(req, res) {
    try {
      await Customer.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error deleting customer", error });
    }
  }
}

export default new CustomerController();
