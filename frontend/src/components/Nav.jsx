import React from "react";
import { nav } from "../data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const Nav = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="hidden lg:flex">
      <ul className="flex text-white gap-x-8 ">
        <li>
          <Link
            to="/"
            className="flex items-center text-white text-body-sm hover:text-cyan-400 transition"
          >
            Acasă
            <AiOutlineHome className="ml-[0.5rem]" size={26} />
          </Link>
        </li>
        {/* <li>
          <Link
            to="/antrenamente"
            className="text-white text-body-sm hover:text-cyan-300
           transition"
          >
            Antrenamente
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/abonamente"
            className="text-white text-body-sm hover:text-cyan-300
           transition"
          >
            Abonamente
          </Link>
        </li> */}
        <li>
          <Link
            to="/shop"
            className="flex items-center text-white text-body-sm hover:text-cyan-400 transition"
          >
            Magazin
            <AiOutlineShopping className="ml-[0.5rem]" size={26} />
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="flex items-center relative text-white text-body-sm hover:text-cyan-400 transition"
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
      </ul>
    </nav>
  );
};

export default Nav;
