import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice.js";
import { clearCartItems } from "../../redux/features/cart/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="h1 text-white mb-8 mt-[2rem]">
          Rezumat<span className="text-cyan-400">.</span>
        </h1>
        <ProgressSteps step1 step2 step3 />
      </div>

      <div className="container mx-auto mt-8 text-white">
        {cart.cartItems.length === 0 ? (
          <Message variant="warning">Coșul tău este gol.</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2C2C2C]">
                  <th className="px-4 py-2 text-left text-cyan-400">Imagine</th>
                  <th className="px-4 py-2 text-left text-cyan-400">
                    Nume Produs
                  </th>
                  <th className="px-4 py-2 text-left text-cyan-400">
                    Cantitate
                  </th>
                  <th className="px-4 py-2 text-left text-cyan-400">Preț</th>
                  <th className="px-4 py-2 text-left text-cyan-400">Total</th>
                </tr>
              </thead>

              <tbody className="bg-[#1A1A1A]">
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-neutral-700">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-cyan-400 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)} lei</td>
                    <td className="p-2">
                      {(item.qty * item.price).toFixed(2)} lei
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-[#181818] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-5 text-cyan-400">
            Rezumatul comenzii
          </h2>
          <div className="flex justify-between flex-wrap">
            <ul className="text-lg space-y-3">
              <li>
                <span className="font-semibold text-white">Cost produse: </span>
                {cart.itemsPrice} lei
              </li>
              <li>
                <span className="font-semibold text-white">Livrare: </span>
                {cart.shippingPrice} lei
              </li>
              <li>
                <span className="font-semibold text-white">Total: </span>
                {cart.totalPrice} lei
              </li>
            </ul>

            <div className="text-white">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                Livrare:
              </h2>
              <p>
                <strong>Adresă:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="text-white">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                Metodă de plată
              </h2>
              <strong>Metodă:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4 transition-all duration-200"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Plasează comanda
          </button>

          {isLoading && <Loader />}
        </div>

        {error && (
          <Message variant="danger" className="mt-4">
            {error.data.message}
          </Message>
        )}
      </div>
    </section>
  );
};

export default PlaceOrder;
