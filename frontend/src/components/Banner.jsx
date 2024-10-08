import React from "react";
import { banner } from "../data";
import { Link } from "react-router-dom";

const Banner = () => {
  const { titlePart1, titlePart2, subtitle, textBtn } = banner;
  return (
    <section className="bg-neutral-500 h-[800px]">
      <div className="container mx-auto h-full">
        <div
          className="flex items-center 
      h-full relative -space-x-48 lg:-space-x-60"
        >
          <div className="text-white flex-1 z-10 pl-6 lg:pl-0">
            <h1
              className="h1 text-white mb-8"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              {titlePart1} <br />
              <span className="text-cyan-400">{titlePart2}</span>
            </h1>
            <p
              className="max-w-[400px] text-body-md 
            lg:text-body-lg mb-2"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              {subtitle}
            </p>
            <Link to="/register">
              <button
                className="btn btn-sm lg:btn-lg btn-secondary"
                data-aos="fade-down"
                data-aos-delay="700"
              >
                {textBtn}
              </button>
            </Link>
          </div>
          <div
            className="bg-blue-300 w-full h-full 
            bg-banner bg-cover bg-right lg:bg-center 
            bg-no-repeat flex-1"
            data-aos="fade-left"
            data-aos-delay="900"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
