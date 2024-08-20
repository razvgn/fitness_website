import React from "react";
import { footer } from "../data";

const Footer = () => {
  const { logo, copyrightText } = footer;
  return (
    <footer className="bg-neutral-500 h-[120px] md:h-[195px] px-[20px]">
      <div
        className="container mx-auto h-full flex justify-between items-center
      md:items-end md:pb-[50px]"
        // data-aos="fade-up"
        // data-aos-delay="200"
      >
        <a href="#">
          <img src={logo} alt="" />
        </a>
        <p className="text-neutral-300 text-sm font-primary pl-[1rem]">
          Număr de telefon: 0707070707
        </p>
        <p className="text-neutral-300 text-sm font-primary pl-[1rem] ">
          E-mail: sala@email.ro
        </p>
        <p className="text-neutral-300 text-sm font-primary pl-[1rem]">
          Locație: Str. X, Sector Y, București
        </p>
      </div>
    </footer>
  );
};

export default Footer;
