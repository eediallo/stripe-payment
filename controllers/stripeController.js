import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeInstance = new stripe(process.env.STRIPE_KEY);

export const stripeController = async (req, res) => {
  const { total_amount, shipping_fee } = req.body;

  const calculateTotalOrder = () => total_amount + shipping_fee;

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: calculateTotalOrder(),
      currency: "usd",
    });

    console.log(paymentIntent);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Payment intent creation failed" });
  }
};
