const { Customer, User } = require("../models");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const {
      customer_name,
      date,
      contact_number,
      email_address,
      customer_address,
      opening_balance,
      to_pay,
      to_receive,
    } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const customer = await Customer.create({
      user_id: user.user_id,
      customer_name,
      date,
      contact_number,
      email_address,
      customer_address,
      opening_balance,
      to_pay: !!to_pay,
      to_receive: !!to_receive,
    });

    res.status(201).json({ message: "Customer created", customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers of logged-in user
exports.getCustomers = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const customers = await Customer.findAll({
      where: { user_id: user.user_id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ customers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const customer = await Customer.findOne({
      where: { id: id, user_id: user.user_id },
    });

    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    await customer.update(req.body);

    res.json({ message: "Customer updated", customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const customer = await Customer.findOne({
      where: { id: id, user_id: user.user_id },
    });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    await customer.destroy();

    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
