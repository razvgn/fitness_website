import React from "react";
import { FaDumbbell } from "react-icons/fa";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isActive = bodyPart === item;

  return (
    <div
      className={`flex flex-col items-center justify-center w-36 h-36 cursor-pointer rounded-lg shadow-lg transition-all ${
        isActive ? "bg-cyan-400 text-white" : "bg-white"
      }`}
      onClick={() => {
        setBodyPart(item);
      }}
    >
      <FaDumbbell
        className={`text-3xl ${isActive ? "text-white" : "text-black"}`}
      />
      <p
        className={`text-lg font-semibold mt-2 capitalize ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {item}
      </p>
    </div>
  );
};

export default BodyPart;
