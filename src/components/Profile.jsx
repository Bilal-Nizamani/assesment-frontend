"use client";
import React from "react";
import Image from "next/image";
import img from "../../public/imgnotavailable.jpeg";
import Card from "./Card";
const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="max-w-[1263px] m-auto">
      {user && (
        <div className=" p-8 shadow-md rounded-md">
          <div className=" flex justify-center gap-x-8">
            <div className="relative w-40 h-40  mb-4">
              <Image
                src={img}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-4xl text-green-700 mt-5 font-bold">
                {user.username}
              </h2>
              <p className="text-green-700 mt-5">{user.email}</p>
            </div>
          </div>
          <h3 className="text-3xl text-green-700 font-bold mt-4 mb-2 text-center">
            Your Magic Cards
          </h3>
          <ul className="flex flex-wrap items-start justify-start lg:-mx-4">
            {user?.cards?.map((card) => {
              return <Card key={card.id} cardData={card} isMyCard={true} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
