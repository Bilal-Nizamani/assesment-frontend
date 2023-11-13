import React, { useState } from "react";
import FullCard from "./FullCard";
import Image from "next/image";

const Card = ({ cardData, isMyCard }) => {
  const [fullCard, setFullCard] = useState(false);
  const keys = ["number", "artist", "flavor", "type", "price"];
  const openFullCard = () => {
    setFullCard((prev) => {
      return !prev;
    });
  };

  if (fullCard) {
    return (
      <FullCard
        card={cardData}
        isMyCard={isMyCard}
        openFullCard={openFullCard}
      />
    );
  }
  return (
    <div
      onClick={openFullCard}
      className=" m-auto  sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 "
    >
      <div className="overflow-hidden rounded-lg md:p-4 py-4 shadow-lg transition-transform transform hover:scale-105">
        <div className=" flex  cursor-pointer ">
          <Image
            alt={cardData.name}
            height={380}
            width={100}
            className=" w-[100%] object-contain max-h-[100%]  pb-4"
            src={cardData.imageUrl || "/imgnotavailable.jpeg"}
            unoptimized
          />
        </div>
        <h3 className="text-green-700">{cardData.name}</h3>
        <p className="text-sm text-gray-400"> {cardData.text} </p>

        {keys.map((key) => {
          return (
            <div key={key} className="mb-2 flex gap-x-4  ">
              <label className="text-sm text-green-600 font-bold">{key}:</label>
              <p className="text-sm text-gray-400">{cardData[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
