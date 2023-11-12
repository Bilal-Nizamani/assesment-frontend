import React from "react";
import PaymentForm from "./PaymentForm";

const MagicCard = ({ card, price, openFullCard }) => {
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
    originalText,
    originalType,
    id,
  } = card;

  return (
    <div className="magic-card w-[90%] overflow-scroll h-[90%] fixed top-5 right-16  z-50 flex-wrap flex justify-around items-start bg-white border border-gray-300 rounded-lg  shadow-md p-4">
      <div
        onClick={openFullCard}
        className="bg-red-700 rounded-full cursor-pointer active:scale-95 text-white hover:bg-red-500 p-2 py-4 fixed right-24 top-8"
      >
        Close
      </div>
      <div className="">
        <PaymentForm price={price} card={card} />
      </div>

      <div className="mb-4 basis-[60%]">
        <h2 className="text-xl font-bold mb-2">Card Information</h2>

        <ul className="list-disc pl-4">
          <li>
            <strong>Name:</strong> {name}
          </li>
          {names && (
            <li>
              <strong>Names:</strong> {names?.join(", ")}
            </li>
          )}
          <li>
            <strong>Mana Cost:</strong> {manaCost}
          </li>
          <li>
            <strong>CMC:</strong> {cmc}
          </li>
          <li>
            <strong>Colors:</strong> {colors?.join(", ")}
          </li>
          <li>
            <strong>Color Identity:</strong> {colorIdentity?.join(", ")}
          </li>
          <li>
            <strong>Type:</strong> {type}
          </li>
          <li>
            <strong>Supertypes:</strong> {supertypes?.join(", ")}
          </li>
          <li>
            <strong>Types:</strong> {types?.join(", ")}
          </li>
          <li>
            <strong>Subtypes:</strong> {subtypes?.join(", ")}
          </li>
          <li>
            <strong>Rarity:</strong> {rarity}
          </li>
          <li>
            <strong>Set:</strong> {set}
          </li>
          <li>
            <strong>Text:</strong> {text}
          </li>
          <li>
            <strong>Artist:</strong> {artist}
          </li>
          <li>
            <strong>Number:</strong> {number}
          </li>
          <li>
            <strong>Power/Toughness:</strong> {power}/{toughness}
          </li>
          <li>
            <strong>Layout:</strong> {layout}
          </li>
          <li>
            <strong>Multiverse ID:</strong> {multiverseid}
          </li>
          <li>
            <strong>Printings:</strong> {printings?.join(", ")}
          </li>
          <li>
            <strong>Original Text:</strong> {originalText}
          </li>
          <li>
            <strong>Original Type:</strong> {originalType}
          </li>
          <li>
            <strong>ID:</strong> {id}
          </li>
        </ul>
        {rulings && rulings.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Rulings</h2>
            <ul className="list-disc pl-4">
              {rulings.map((ruling, index) => (
                <li key={index}>{ruling.text}</li>
              ))}
            </ul>
          </div>
        )}
        {foreignNames && foreignNames.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Foreign Names</h2>
            <ul className="list-disc pl-4">
              {foreignNames.map((foreignName, index) => (
                <li
                  key={index}
                >{`Name: ${foreignName.name}, Language: ${foreignName.language}, Multiverse ID: ${foreignName.multiverseid}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicCard;
