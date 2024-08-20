import React from "react";
import { workouts } from "../data";
import WorkoutPhotos from "./Wo_photos";

const Workouts = () => {
  const { title, icon } = workouts;
  return (
    <section className="section">
      <div
        className="section-title-group max-w-[540px] mx-auto 
      px-4 lg:px-0"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img src={icon} alt="" />
        <h2 className="h2 section-title">
          {title} <span className="text-cyan-400">.</span>
        </h2>
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <WorkoutPhotos />
      </div>
    </section>
  );
};

export default Workouts;
