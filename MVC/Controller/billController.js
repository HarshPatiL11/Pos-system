import billModel from "../Model/billModel.js";

export const addBillControl = async (req, res) => {
  try {
    const { customerName, customerPhone, subTotal, totalAmount, tax, paymentMode, items } = req.body;
    if (!customerName) return res.status(400).send({ message: "Enter the customer's name" });
    if (!customerPhone) return res.status(400).send({ message: "Enter the customer Phone number" });
    if (!subTotal || subTotal <= 0 || subTotal === null) return res.status(400).send({ message: "Check sub total amount" });
    if (!totalAmount || totalAmount <= 0 || totalAmount === null) return res.status(400).send({ message: "Check total amount" });
    if (!tax || tax <= 0 || tax === null) return res.status(400).send({ message: "Check tax amount" });
    if (!paymentMode) return res.status(400).send({ message: "Enter the payment mode" });
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).send({ message: "Items cannot be empty" });
    const latestBill = await billModel.findOne().sort({ billID: -1 }).exec();
    let billID = latestBill ? latestBill.billID + 1 : 1;
    const newBill = await billModel.create({
      billID,
      customerName,
      customerPhone,
      subTotal,
      tax,
      totalAmount,
      paymentMode,
      items
    });

    await newBill.save();
    res.status(201).send({
      status: true,
      message: 'Bill created successfully',
      newBill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await billModel.find();
    return res.status(201).send({
      status: true,
      message: 'Bills fetched successfully',
      bills
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
export const getBillById = async (req, res) => {
    try {
        const bill = await billModel.findOne({ billID: req.params.billID });
        if (!bill) {
            return res.status(404).send({ message: 'Bill not found' });
        }
        res.status(200).send({
            status: true,
            message: 'Bill fetched successfully',
            bill
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
