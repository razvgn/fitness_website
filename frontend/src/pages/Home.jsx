import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

import Banner from "../components/Banner";
import Header from "../components/Header";
import About from "../components/About";
import Workouts from "../components/Workouts";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";

const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <Workouts />
      <Pricing />
      <Faq />
    </div>
  );
};

export default Home;
