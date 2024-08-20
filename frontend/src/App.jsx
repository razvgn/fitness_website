import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";

// import Banner from "./components/Banner";
// import Header from "./components/Header";
// import About from "./components/About";
// import Workouts from "./components/Workouts";
// import Pricing from "./components/Pricing";
// import Faq from "./components/Faq";
// import Footer from "./components/Footer";
// import NavMobile from "./components/NavMobile";

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

// const App = () => {
//   Aos.init({
//     duration: 2500,
//     delay: 400,
//   });
//   return (
//     <div className="mx-auto bg-page overflow-hidden relative">
//       <Header />
//       <main>
//         <Outlet />
//       </main>
//       <Banner />
//       <About />
//       <Workouts />
//       <Pricing />
//       <Faq />
//       <Footer />

//       {/* <div className="h-[4000px]"></div> */}
//     </div>
//   );
// };

export default App;
