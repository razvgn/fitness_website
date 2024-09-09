import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";

const NavMobile = ({ navMobile, setNavMobile }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      closeNav();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeNav = () => {
    setNavMobile(false);
  };

  return (
    <nav
      className={`${
        navMobile ? "min-h-screen" : "min-h-0"
      } lg:hidden w-full bg-neutral-500 fixed 
    top-0 left-0 right-0 -bottom-12 
    -z-10 overflow-y-auto transition-all h-0`}
    >
      <ul className="w-full h-full flex flex-col justify-center items-center gap-y-8">
        <li>
          <Link
            to="/"
            className="flex items-center text-white text-body-md hover:text-cyan-400 transition"
            onClick={closeNav}
          >
            Acasă
            <AiOutlineHome className="ml-[1rem]" size={26} />
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="flex items-center text-white text-body-md hover:text-cyan-400 transition"
            onClick={closeNav}
          >
            Magazin
            <AiOutlineShopping className="ml-[1rem]" size={26} />
          </Link>
        </li>
        <li>
          <Link
            to="/exercises"
            className="flex items-center text-white text-body-md hover:text-cyan-400 transition"
          >
            Exerciții
            <GiBiceps className="ml-[0.5rem]" size={26} />
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="flex items-center relative text-white text-body-md hover:text-cyan-400 transition"
            onClick={closeNav}
          >
            Coșul meu
            <AiOutlineShoppingCart className="ml-[0.5rem]" size={26} />
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-3 bg-cyan-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
        </li>

        <li>
          <div className="flex justify-center items-start gap-x-2">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-800 focus:outline-none"
              >
                {userInfo ? (
                  <span className="text-white hover:text-cyan-400 text-body-md">
                    {userInfo.username}
                  </span>
                ) : (
                  <></>
                )}
                {userInfo && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1  ${
                      dropdownOpen ? "transform rotate-90" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="cyan"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                )}
              </button>

              {dropdownOpen && userInfo && (
                <ul
                  className={`absolute top-6 w-40 bg-white text-neutral-500 ${
                    !userInfo.isAdmin ? "top-[30px]" : "top-[30px]"
                  } shadow-lg rounded-md`}
                >
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                          onClick={closeNav}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                          onClick={closeNav}
                        >
                          Produse
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                          onClick={closeNav}
                        >
                          Categorii
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                          onClick={closeNav}
                        >
                          Comenzi
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                          onClick={closeNav}
                        >
                          Utilizatori
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      onClick={closeNav}
                    >
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
                    >
                      Deconectare
                    </button>
                  </li>
                </ul>
              )}

              {!userInfo && (
                <div className="flex justify-center space-x-4">
                  <Link to="/login" onClick={closeNav}>
                    <button className="btn btn-lg btn-secondary">
                      Autentificare
                    </button>
                  </Link>
                  <Link to="/register" onClick={closeNav}>
                    <button className="btn btn-lg btn-primary">
                      Înregistrare
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
