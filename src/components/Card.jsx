import React, { useState } from "react";
import FullCard from "./FullCard";
import Image from "next/image";

const Card = ({ cardData, price }) => {
  const [fullCard, setFullCard] = useState(false);
  const keys = [
    "number",
    "artist",
    "layout",
    "flavor",
    "set",
    "type",
    "originalType",
  ];
  const openFullCard = () => {
    setFullCard((prev) => {
      return !prev;
    });
  };
  if (fullCard) {
    return (
      <FullCard card={cardData} price={price} openFullCard={openFullCard} />
    );
  }
  return (
    <div
      onClick={openFullCard}
      className=" m-auto  sm:w-1/1 md:w-1/2 lg:w-1/3  xl:w-1/4 p-2"
    >
      <div className="overflow-hidden  rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
        <div className=" h-[380px] cursor-pointer ">
          <Image
            alt={cardData.name}
            fill
            className="block w-full object-cover"
            src={cardData.imageUrl || "/imgnotavailable.jpeg"}
            unoptimized
          />
        </div>
        <h3>{cardData.name}</h3>
        <p className="text-sm text-gray-700"> {cardData.text} </p>

        <div className="mb-2 flex gap-x-4 items-center ">
          <label className="text-sm font-bold">Price:</label>
          <p className="text-sm text-gray-700">{price}$</p>
        </div>
        {keys.map((key) => {
          return (
            <div key={key} className="mb-2 flex gap-x-4 items-center ">
              <label className="text-sm font-bold">{key}:</label>
              <p className="text-sm text-gray-700">{cardData[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
