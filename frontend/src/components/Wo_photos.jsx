import React from "react";
import { workouts } from "../data";

const WorkoutPhotos = () => {
  const { programs } = workouts;
  return (
    <section className="section p-2">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
      lg:grid-cols-3 justify-items-center gap-y-10"
      >
        {programs.map((program, idx) => (
          <div
            key={idx}
            className="relative max-w-[440px] 
            max-h-[420px]"
          >
            <img
              src={program.image}
              alt=""
              className="w-[320px] h-[320px] object-cover"
            />
            <div
              className="absolute left-[20px] bottom-[20px] bg-white
            h-[26px] px-[14px] flex items-center rounded-[1px]"
            >
              <div
                className="font-primary font-semibold text-sm
              text-neutral-500"
              >
                {program.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkoutPhotos;
