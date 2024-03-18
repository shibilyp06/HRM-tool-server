/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */

const Razorepay = require("razorpay");

const razorPay = new Razorepay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  const options = {
    amount: 500000,
    currency: "INR",
  };
  try {
    const order = await razorPay.orders.create(options);
    res.status(200).json({ message: "order send successfily", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

module.exports = createOrder;
