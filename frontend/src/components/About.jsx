import React from "react";
import { about } from "../data";
import { IoIosArrowDropupCircle } from "react-icons/io";

const About = () => {
  const { title, subtitle1, subtitle2, icon, link } = about;

  return (
    <section className="py-[80px] md:py-[110px] lg:pt-[140px] lg:pb-[180px]">
      <div className="container mx-auto px-[20px] lg:px-[135px]">
        <div
          className="section-title-group justify-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img src={icon} alt="" />
          <h2 className="h2 section-title">
            {title} <span className="text-cyan-400">.</span>
          </h2>
        </div>
        <p
          className="md:text-body-md mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {subtitle1}
        </p>
        <p
          className="md:text-body-md mb-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {subtitle2}
        </p>
        <div>
          <a href="#"></a>
        </div>
      </div>
    </section>
  );
};

export default About;
