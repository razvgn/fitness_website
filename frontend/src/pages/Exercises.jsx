import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ExercisesPage from "../components/ExercisesPage";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <section className="bg-neutral-900 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-[3rem]">
          Exerciții<span className="text-cyan-400">.</span>
        </h1>
      </div>
      <SearchBar
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <div className="w-full overflow-x-auto">
        <ExercisesPage
          exercises={exercises}
          setExercises={setExercises}
          bodyPart={bodyPart}
        />
      </div>
    </section>
  );
};

export default Exercises;
