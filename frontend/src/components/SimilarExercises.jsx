import React from "react";
import ExerciseCard from "./ExerciseCard";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <section className="bg-neutral-900 py-6 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 -mt-[14rem]">
          Exerciții similare pentru{" "}
          <span className="text-cyan-400 capitalize">
            {targetMuscleExercises.length > 0 &&
              targetMuscleExercises[0].target}
          </span>
        </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4">
            {targetMuscleExercises.length > 0 ? (
              targetMuscleExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))
            ) : (
              <p>Nu sunt exerciții similare disponibile.</p>
            )}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-8">
          Exerciții similare pentru{" "}
          <span className="text-cyan-400 capitalize">
            {equipmentExercises.length > 0 && equipmentExercises[0].equipment}
          </span>
        </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4">
            {equipmentExercises.length > 0 ? (
              equipmentExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))
            ) : (
              <p>Nu sunt exerciții similare disponibile.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarExercises;
