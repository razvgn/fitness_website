import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Parolele nu sunt la fel.");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profilul a fost editat cu succes!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section
      className="bg-neutral-500 min-h-screen
     flex justify-center pt-[7rem] pb-[1rem] w-full "
    >
      <div className="w-full">
        <div
          className="text-white flex flex-col w-full text-center"
          // data-aos="fade-down"
          // data-aos-delay="500"
        >
          <h1 className="h1 text-white mb-8 mt-[2rem]">
            Editare Profil<span className="text-cyan-400">.</span>
          </h1>
          <form
            onSubmit={submitHandler}
            className="container w-[30rem] mx-auto"
          >
            <div className="my-[1rem]">
              <label htmlFor="name" className="block text-2xl text-white">
                Nume:
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded w-full text-black"
                placeholder="Introduceți numele"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="my-[1rem]">
              <label htmlFor="email" className="block text-2xl text-white">
                Adresa de Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-input mt-1 p-2 border rounded w-full text-black"
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
                className="form-input mt-1 p-2 border rounded w-full text-black"
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
                className="form-input mt-1 p-2 border rounded w-full text-black"
                placeholder="Introduceți din nou parola dorită"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-start gap-8">
              <button
                type="submit"
                className="btn btn-primary w-[15rem] px-4 py-2 rounded my-[0.5rem]"
              >
                Editare
              </button>

              <Link
                to="/user-orders"
                className="btn btn-primary w-[15rem] px-4 py-2 rounded my-[0.5rem]"
              >
                Comenzile Mele
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
