import React from "react";
import { FaDumbbell, FaHeartbeat, FaWeight } from "react-icons/fa";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: <FaDumbbell className="w-10 h-10 text-white" />,
      name: bodyPart,
    },
    {
      icon: <FaHeartbeat className="w-10 h-10 text-white" />,
      name: target,
    },
    {
      icon: <FaWeight className="w-10 h-10 text-white" />,
      name: equipment,
    },
  ];

  return (
    <section className="bg-neutral-900 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl p-5 gap-12">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold capitalize text-white">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Exercițiile te mențin puternic.{" "}
            <span className="capitalize">{name}</span> este unul dintre cele mai
            bune exerciții pentru a viza {target}. Te va ajuta să îți
            îmbunătățești starea de spirit și să îți crești nivelul de energie.
          </p>
          <div className="flex flex-col gap-4">
            {extraDetail.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-6 bg-neutral-800 p-4 rounded-lg shadow-lg"
              >
                <div className="w-20 h-20 flex justify-center items-center bg-cyan-500 rounded-full">
                  {item.icon} {/* Using react-icons instead of images */}
                </div>
                <p className="text-lg md:text-2xl font-medium capitalize">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
