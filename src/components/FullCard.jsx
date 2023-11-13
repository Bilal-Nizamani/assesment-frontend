import React from "react";
import PaymentForm from "./PaymentForm";
import Image from "next/image";
const FullCard = ({ card, openFullCard, isMyCard }) => {
  const {
    name,
    names,
    manaCost,
    cmc,
    colors,
    colorIdentity,
    type,
    supertypes,
    types,
    subtypes,
    rarity,
    set,
    text,
    artist,
    number,
    power,
    toughness,
    layout,
    multiverseid,
    imageUrl,
    rulings,
    foreignNames,
    printings,
    price,
    originalText,
    originalType,
    id,
  } = card;

  return (
    <div className="h-[98vh] overflow-x-scroll max-w-[100%]  flex  bg-center items-center  absolute z-10">
      <div className="magic-card flex flex-col lg:flex-row overflow-x-scroll fixed  top-0 left-0 bg-[rgba(0,0,0,0.9)]  h-full  z-50  items-start  py-4 px-10">
        <div
          onClick={openFullCard}
          className="bg-red-700 rounded-full cursor-pointer active:scale-95 text-white hover:bg-red-500 p-2 py-4 fixed right-24 top-8"
        >
          Close
        </div>
        {!isMyCard ? (
          <div className="min-w-[350px]">
            <PaymentForm card={card} />
          </div>
        ) : (
          <Image
            alt={name}
            height={300}
            width={200}
            className=" w-full  object-contain   pb-4"
            src={imageUrl || "/imgnotavailable.jpeg"}
            unoptimized
          />
        )}

        <div className="mb-4 sm:-mt-56 lg:mt-0 h-full  ">
          <h2 className="text-4xl  tracking-widest text-green-600 font-bold mb-2">
            Card Information
          </h2>

          <ul className="list-none pl-4 flex flex-wrap items-center  space-y-2 text-gray-400 ">
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Name:</strong> {name}
            </li>
            {names && (
              <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
                <strong className="text-green-600">Names:</strong>{" "}
                {names?.join(", ")}
              </li>
            )}
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Price:</strong> {price}$
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Mana Cost:</strong> {manaCost}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">CMC:</strong> {cmc}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Colors:</strong>{" "}
              {colors?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Color Identity:</strong>{" "}
              {colorIdentity?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Type:</strong> {type}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Supertypes:</strong>{" "}
              {supertypes?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Types:</strong>{" "}
              {types?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Subtypes:</strong>{" "}
              {subtypes?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Rarity:</strong> {rarity}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Set:</strong> {set}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Text:</strong> {text}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Artist:</strong> {artist}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Number:</strong> {number}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Power/Toughness:</strong>{" "}
              {power}/{toughness}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Layout:</strong> {layout}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Multiverse ID:</strong>{" "}
              {multiverseid}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Printings:</strong>{" "}
              {printings?.join(", ")}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Original Text:</strong>{" "}
              {originalText}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">Original Type:</strong>{" "}
              {originalType}
            </li>
            <li className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md p-2 rounded-md">
              <strong className="text-green-600">ID:</strong> {id}
            </li>
          </ul>
          {rulings && rulings.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl text-green-600 font-bold mb-2">Rulings</h2>
              <ul className="list-none text-gray-400 pl-4">
                {rulings.map((ruling, index) => (
                  <li key={index}>{ruling.text}</li>
                ))}
              </ul>
            </div>
          )}
          {foreignNames && foreignNames.length > 0 && (
            <div>
              <h2 className="text-xl text-green-600 font-bold mb-2">
                Foreign Names
              </h2>
              <ul className="list-none flex text-gray-400 flex-wrap pl-4">
                {foreignNames.map((foreignName, index) => (
                  <li key={index}>
                    <strong className="text-green-600"> Name:</strong>
                    {foreignName.name}
                    <strong className="text-green-600"> Language:</strong>
                    {foreignName.language},
                    <strong className="text-green-600"> Multiverse ID:</strong>
                    {foreignName.multiverseid}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullCard;
