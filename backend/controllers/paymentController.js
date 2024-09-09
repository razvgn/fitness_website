//paymentController.js
import Stripe from "stripe";
import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

const stripe = new Stripe(
  "sk_test_51PpvX2B6v02PKydXPMX5uoLLE0inZVlQSSl5OA0wKVLNuFmFr7A9NuHG1q7xPHItLxUWyZt0GwaMVh2XAv9dprK200GnN7mh4M"
);
const RON_TO_USD_RATE = 0.22;

export const getStripePublicKey = (req, res) => {
  res.json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
};

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { orderId, items, shippingCost } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...items.map((item) => {
          const priceInUSD = item.price * RON_TO_USD_RATE;
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(priceInUSD * 100),
            },
            quantity: item.quantity,
          };
        }),
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Livrare",
            },
            unit_amount: Math.round(shippingCost * RON_TO_USD_RATE * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/order/${orderId}?success=true`,
      cancel_url: `http://localhost:5173/order/${orderId}`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});
