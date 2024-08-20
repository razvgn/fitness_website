import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Parolele nu sunt la fel.");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Utilizator înregistrat cu succes!");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="bg-neutral-500 h-[1200px] pt-[5rem]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row h-full">
          <div
            className="text-white flex-1 z-10 pl-6 lg:pl-0"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            <h1 className="h1 text-white mt-[2rem]">
              Înregistrare<span className="text-cyan-400">.</span>
            </h1>

            <form onSubmit={submitHandler} className="container w-[30rem]">
              <div className="my-[1rem]">
                <label htmlFor="name" className="block text-2xl text-white">
                  Nume:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border rounded w-full text-black"
                  placeholder="Introduceți numele"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="my-[1rem]">
                <label htmlFor="email" className="block text-2xl text-white">
                  Adresa de Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded w-full text-black"
                  placeholder="Introduceți adresa de email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="my-[1rem]">
                <label htmlFor="password" className="block text-2xl text-white">
                  Parola:
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 border rounded w-full text-black"
                  placeholder="Introduceți parola dorită"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="my-[1rem]">
                <label
                  htmlFor="confirmPassword"
                  className="block text-2xl text-white"
                >
                  Confirmați parola:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 p-2 border rounded w-full text-black"
                  placeholder="Introduceți din nou parola dorită"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="bg-cyan-400
            text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]
            hover:bg-cyan-500/90 transition mb-10"
              >
                {isLoading ? "Se încarcă..." : "Înregistrare"}
              </button>
              {isLoading && <Loader />}
            </form>

            <div className="">
              <p className="text-white -my-[1rem]">
                Ai deja un cont?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-cyan-400 hover:underline"
                >
                  Autentifică-te
                </Link>
              </p>
            </div>
          </div>

          <div
            className="w-full h-[550px] lg:bg-center
            bg-banner bg-left
            bg-no-repeat flex-1 mt-[5rem]"
            data-aos="fade-left"
            data-aos-delay="500"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
