import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-52">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-white text-lg font-semibold truncate">
            {product.name}
          </h2>
        </Link>
        <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {product.price} lei
        </span>
      </div>
    </div>
  );
};

export default SmallProduct;
