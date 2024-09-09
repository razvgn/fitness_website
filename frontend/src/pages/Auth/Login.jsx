import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Banner from "../../components/Banner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation;
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Email sau parolă greșită.");
    }
  };

  return (
    <section className="bg-neutral-500 h-[1200px] pb-4 pt-[5rem]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start h-full">
          <div
            className="text-white flex-1 z-10 px-6 lg:px-0 lg:w-1/2"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            <h1 className="h1 text-white mb-8 mt-8">
              Autentificare<span className="text-cyan-400">.</span>
            </h1>
            <form onSubmit={submitHandler} className="w-full lg:w-[30rem]">
              <div className="my-8">
                <label htmlFor="email" className="block text-2xl text-white">
                  Adresa de Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded w-full text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="my-8">
                <label htmlFor="password" className="block text-2xl text-white">
                  Parola:
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 border rounded w-full text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="bg-cyan-400 text-white px-4 py-2 rounded cursor-pointer my-4 hover:bg-cyan-500/90 transition"
              >
                {isLoading ? "Autentificare..." : "Intră în cont"}
              </button>

              {isLoading && <Loader />}
            </form>

            <div className="mt-4 mb-10">
              <p className="text-white">
                Nu ai un cont creat?{" "}
                <Link
                  to={
                    redirect
                      ? `/inregistrare?redirect=${redirect}`
                      : "/inregistrare"
                  }
                  className="text-cyan-400 hover:underline"
                >
                  Creează cont
                </Link>
              </p>
            </div>
          </div>
          <div
            className="lg:flex-1 w-full h-[600px] bg-banner bg-cover bg-center lg:ml-8"
            data-aos="fade-left"
            data-aos-delay="500"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Login;
