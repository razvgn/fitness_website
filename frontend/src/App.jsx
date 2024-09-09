import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  Aos.init({
    duration: 2500,
    delay: 400,
  });
  return (
    <>
      <div className="mx-auto bg-page overflow-hidden relative">
        <ToastContainer />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
