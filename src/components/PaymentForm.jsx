// // Import necessary dependencies
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import axios from "axios";
import { getAuthToken } from "@/utils/handleCookies";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function PaymentForm({ card }) {
  const [loading, setLoading] = useState(false);
  const { imageUrl, text, name } = card;
  const [item, setItem] = useState({
    name: name,
    description: text,
    image: imageUrl,
    quantity: 0,
    price: card.price,
  });

  const token = getAuthToken();
  const userId = localStorage.getItem("userId");

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
    "pk_test_51OBb2IINzQFNY8CGEYy4YTxWAT112X9GtERNEpoiXhXENWBy010dgifGhBVnZMRibV4DKwaymLOQnGr2VRUTjMjZ00i7Jvfwfw";
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const checkoutSession = await axios.post(
        "http://localhost:5000/payment-checkout",
        {
          item: item,
          userId: userId,
          card: card,
        },
        {
          headers: {
            Authorization: token, // Replace yourToken with the actual token
          },
        }
      );
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };
  return (
    <div className=" h-fit ">
      <main>
        <div className="shadow-lg sm:flex lg:block border rounded p-2 mb-[0rem] sm:mb-[20rem]">
          <div className="flex basis-[40%]">
            <Image
              src={item.image}
              width={350}
              height={150}
              alt={item.name}
              unoptimized // Add the unoptimized prop
              className=" w-[100%] object-contain max-h-[100%]  pb-4"
            />
          </div>
          <div className="basis-[60%]">
            <h2 className="text-2xl text-green-600">$ {item.price}</h2>
            <h3 className="text-xl text-green-600">{item.name}</h3>
            <p className="text-gray-500">{item.description}</p>
            <p className="text-sm text-gray-300 mt-1">Quantity:</p>
            <div className="border flex rounded">
              <button
                onClick={onQuantityMinus}
                className="bg-red-700 basis-[20%] py-2 pr-2 text-white  hover:bg-red-600"
              >
                -
              </button>
              <input
                type="number"
                className="py-2 w-full text-center basis-60%"
                onChange={onInputChange}
                value={item.quantity}
              />
              <button
                onClick={onQuantityPlus}
                className="bg-green-700 basis-[20%]  py-2 pr-2 w-full text-white  hover:bg-green-600"
              >
                +
              </button>
            </div>
            <p className="text-white">Total: ${item.quantity * item.price}</p>
            {token ? (
              <button
                disabled={item.quantity === 0 || !item.quantity || loading}
                onClick={() => {
                  token ? createCheckOutSession() : redirect("/login");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {loading ? "Processing..." : "Buy"}
              </button>
            ) : (
              <Link href="/login">
                <div className="text-center bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100">
                  Login to buy go to login
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
