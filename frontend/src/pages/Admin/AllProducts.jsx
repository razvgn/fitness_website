import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Se încarcă...</div>;
  }

  if (isError) {
    return <div>Eroare la incărcarea produselor.</div>;
  }

  return (
    <section className="bg-neutral-500 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-7xl p-8 rounded-lg shadow-md">
        <AdminMenu />
        <h1 className="h1 text-white mb-8 text-center">
          Toate produsele<span className="text-cyan-400">.</span> (
          {products.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={``}
              className="block mb-4 overflow-hidden bg-[#1A1A1A] rounded-lg"
            >
              <div className="flex flex-col h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-semibold text-white">
                      {product?.name}
                    </h1>
                    <p className="text-gray-400 text-xs">
                      {moment(product.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {product?.description?.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center btn btn-primary text-xs px-2 py-1 rounded transition duration-300"
                    >
                      Actualizează
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
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
                    <p className="text-white font-semibold">
                      {product?.price} RON
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
