import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../Utils/fetchData";
import HorizontalBar from "./HorizontalBar";

const SearchBar = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      if (bodyPartsData) {
        setBodyParts(["all", ...bodyPartsData]);
      } else {
        console.error("Failed to load body parts.");
      }
    };

    fetchBodyParts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <HorizontalBar
        data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </div>
  );
};

export default SearchBar;
