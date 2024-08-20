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
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-md">
        <AdminMenu />
        <h1 className="h1 text-white mb-8 text-center">
          Toate produsele<span className="text-cyan-400">.</span> (
          {products.length})
        </h1>
        <div className="flex flex-wrap justify-around items-center">
          {products.map((product) => (
            <Link
              key={product._id}
              to={``}
              className="block mb-4 overflow-hidden"
            >
              <div className="flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[10rem] object-cover"
                />
                <div className="p-4 flex flex-col justify-around">
                  <div className="flex justify-between">
                    <h1 className="h1 text-xl font-semibold mb-2 text-white">
                      {product?.name}
                    </h1>

                    <p className="text-gray-400 text-xs">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>

                  <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>

                  <div className="flex justify-between">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center btn btn-primary text-xl h-[3rem] w-[20rem] px-4 py-2 rounded transition duration-300"
                    >
                      Actualizează Produsul
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
                    <p>{product?.price} ron</p>
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
