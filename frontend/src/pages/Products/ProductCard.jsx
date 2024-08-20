import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Produsul a fost adăugat în coș", {
      autoClose: 2000,
    });
  };

  return (
    <div className="relative bg-[#1A1A1A] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${p._id}`} className="block">
        <img className="w-full h-48 object-cover" src={p.image} alt={p.name} />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-semibold text-white">{p?.name}</h5>
          <p className="text-lg font-bold text-cyan-400">
            {p?.price?.toLocaleString("ro-RO", {
              style: "currency",
              currency: "LEI",
            })}
          </p>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          {p?.description?.substring(0, 60)}...
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-400 rounded-lg hover:bg-cyan-500 transition duration-300"
          >
            Detalii
            <svg
              className="w-3.5 h-3.5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
