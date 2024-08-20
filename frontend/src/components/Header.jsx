import React, { useState, useEffect } from "react";
import { header } from "../data";
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/features/auth/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logo, btnLoginText, btnSignupText } = header;

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [navMobile, setNavMobile] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 80 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-neutral-500 py-[16px]" : "bg-transparent py-[20px]"
      } fixed w-full z-30 flex justify-between items-center px-[20px] lg:px-[45px] transition-all duration-300`}
    >
      {/* Logo-ul în partea stângă */}
      <a href="/" className="flex-shrink-0">
        <img className="h-auto max-h-[40px] w-auto" src={logo} alt="Logo" />
      </a>

      {/* Navigația în partea dreaptă */}
      <div className="flex items-center space-x-8">
        <Nav />
        {userInfo ? (
          <div className="relative hidden lg:flex">
            {/* Ascunde numele de utilizator pe ecrane mici */}
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-cyan-400"
            >
              {userInfo.username}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="cyan"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-8 w-[8rem] bg-white text-neutral-500 shadow-lg rounded-md">
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Produse
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Categorii
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Comenzi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
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
          </div>
        ) : (
          <div className="hidden lg:flex space-x-4">
            <Link to="/login">
              <button className="btn btn-sm text-white hover:text-cyan-400 transition">
                Autentificare
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm btn-primary">Înregistrare</button>
            </Link>
          </div>
        )}
      </div>

      {/* Meniu mobil */}
      <div
        onClick={() => setNavMobile(!navMobile)}
        className="lg:hidden absolute right-4"
      >
        {navMobile ? (
          <RiCloseFill className="text-cyan-400 text-3x1 w-8 h-8 cursor-pointer" />
        ) : (
          <RiMenu4Fill className="text-cyan-400 text-3x1 w-8 h-8 cursor-pointer" />
        )}
      </div>
      <NavMobile navMobile={navMobile} />
    </header>
  );
};

export default Header;
