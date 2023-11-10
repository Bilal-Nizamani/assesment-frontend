// // Import necessary dependencies
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import axios from "axios";

export default function PaymentForm({ imageUrl, name, text, price }) {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: name,
    description: text,
    image: imageUrl,
    quantity: 0,
    price: price,
  });

  const changeQuantity = (value) => {
    // Don't allow the quantity less than 0, if the quantity is greater than value entered by user then the user entered quantity is used, else 0
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const onInputChange = (e) => {
    changeQuantity(parseInt(e.target.value));
  };

  const onQuantityPlus = () => {
    changeQuantity(item.quantity + 1);
  };

  const onQuantityMinus = () => {
    changeQuantity(item.quantity - 1);
  };

  const publishableKey =
    "pk_test_51OAk6fFZTyU9YKlVXQ5HTjOkectFri6vxTo5fBELsKb8YhyvtGDXgNl3vOlnHW67zMPRMwmPryGly5Zl5HexjugW00HqOHsRLl";
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(
      "http://localhost:5000/payment-checkout",
      {
        item: item,
      }
    );
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  return (
    <div className="container max-w-[350px]">
      <main>
        <div className="shadow-lg border rounded p-2 ">
          <Image
            src={item.image}
            width={350}
            height={150}
            alt={item.name}
            unoptimized // Add the unoptimized prop
          />
          <h2 className="text-2xl">$ {item.price}</h2>
          <h3 className="text-xl">{item.name}</h3>
          <p className="text-gray-500">{item.description}</p>
          <p className="text-sm text-gray-600 mt-1">Quantity:</p>
          <div className="border rounded">
            <button
              onClick={onQuantityMinus}
              className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
            >
              -
            </button>
            <input
              type="number"
              className="p-2"
              onChange={onInputChange}
              value={item.quantity}
            />
            <button
              onClick={onQuantityPlus}
              className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
          <p>Total: ${item.quantity * item.price}</p>
          <button
            disabled={item.quantity === 0 || loading}
            onClick={createCheckOutSession}
            className="bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100"
          >
            {loading ? "Processing..." : "Buy"}
          </button>
        </div>
      </main>
    </div>
  );
}
