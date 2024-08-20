import React from "react";
import { faq } from "../data";
import Accordion from "../components/Accordion";

const Faq = () => {
  const { icon, title, accordions } = faq;

  return (
    <section className=" section pt-[60px] lg:pt-[40px]">
      <div
        className="max-w-[768px] mx-auto lg:bg-faq bg-no-repeat bg-custom
      bg-center lg:h-[1160px] lg:pt-6"
      >
        <div
          className="section-title-group justify-start lg:justify-center
        -space-x-4 lg:max-w-[540px] mx-auto px-4 lg:px-0"
          data-aos="fade-up"
          data-aos-offset="500"
          data-aos-delay="700"
        >
          <img className="lg:hidden" src={icon} alt="" />
          <h2 className="h2 section-title lg:mt-[100px]">
            {title} <span className="text-cyan-400">.</span>
          </h2>
        </div>
        <div
          className="flex flex-col gap-y-4 px-4"
          data-aos="fade-up"
          data-aos-offset="400"
          data-aos-delay="800"
        >
          {accordions.map((accordion, idx) => {
            return <Accordion accordion={accordion} key={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
