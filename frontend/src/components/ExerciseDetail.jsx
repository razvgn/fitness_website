import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Detail from "../components/Detail";
import { exerciseOptions, fetchData } from "../Utils/fetchData";
import Loader from "./Loader";
import SimilarExercises from "./SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setEquipmentExercises(equipmentExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <section className="bg-neutral-900 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-7xl">
        <button
          className="text-white bg-cyan-500 px-4 py-2 rounded-full mb-2 mt-[2rem] hover:bg-cyan-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; Înapoi
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center mt-[1rem]">
          Detalii Exercițiu<span className="text-cyan-400">.</span>
        </h1>
        {!exerciseDetail && (
          <div className="flex justify-center items-center my-8">
            <Loader />
          </div>
        )}
        {exerciseDetail && (
          <>
            <Detail exerciseDetail={exerciseDetail} />
            <SimilarExercises
              targetMuscleExercises={targetMuscleExercises}
              equipmentExercises={equipmentExercises}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ExerciseDetail;
