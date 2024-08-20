import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="h1 text-white mb-8 mt-[2rem]">
          Livrare<span className="text-cyan-400">.</span>
        </h1>
        <ProgressSteps step1 step2 />
      </div>

      <div className=" mt-[2rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <div className="mb-4">
            <label className="block text-white mb-2">Adresa de livrare:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Introduceți adresa"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Oraș:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Introduceți orașul"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Cod poștal:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Introduceți codul poștal"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Țară:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Introduceți țara"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">
              Selectați metoda de plată:
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-cyan-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">PayPal sau Credit Card</span>
              </label>
            </div>
          </div>

          <button
            className="bg-cyan-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Continuă către plată
          </button>
        </form>
      </div>
    </section>
  );
};

export default Shipping;
