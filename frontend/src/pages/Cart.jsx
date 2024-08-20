import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="h1 text-white mb-8 mt-[2rem]">
          Coșul meu<span className="text-cyan-400">.</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl">
        {cartItems.length === 0 ? (
          <div className="text-center mt-20 text-white">
            Coșul tău de cumpărături este gol. Adaugă produse din{" "}
            <Link to="/shop" className="hover:underline text-cyan-300">
              Magazin.
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
            <div className="flex-1">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg mb-4 shadow-lg"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-semibold text-cyan-400"
                      >
                        {item.name}
                      </Link>
                      <div className="text-gray-400">{item.brand}</div>
                      <div className="text-white font-bold mt-1">
                        {item.price} lei
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <select
                      className="p-2 rounded-lg text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 lg:mt-0 lg:w-1/3">
              <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Total produse (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>
                <div className="text-3xl font-bold mb-6">
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}{" "}
                  lei
                </div>

                <button
                  className="bg-cyan-400 text-white w-full py-3 rounded-full font-semibold hover:bg-cyan-500 transition duration-300"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Continuă către livrare
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
