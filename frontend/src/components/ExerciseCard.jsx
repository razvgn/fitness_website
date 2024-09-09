import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="block bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <div className="flex space-x-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 bg-cyan-400 rounded-full">
            <FaDumbbell className="mr-1" />
            {exercise.bodyPart}
          </span>
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 bg-blue-400 rounded-full">
            <FaDumbbell className="mr-1" />
            {exercise.target}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white capitalize mb-1">
          {exercise.name}
        </h3>
      </div>
    </Link>
  );
};

export default ExerciseCard;
