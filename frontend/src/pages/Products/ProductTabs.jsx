import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct.jsx";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[2rem] text-white">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold border-b-2 border-cyan-500" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Oferă o recenzie
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold border-b-2 border-cyan-500" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          Toate recenziile
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold border-b-2 border-cyan-500" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Produse asemănătoare
        </div>
      </section>

      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2 text-white">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Recenzie
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Selectează </option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Bun</option>
                    <option value="4">Foarte bun</option>
                    <option value="5">Extraordinar</option>
                  </select>
                </div>

                <div className="my-2 text-white">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comentariu
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="btn btn-primary w-[10rem] px-4 py-2 rounded my-[0.5rem]"
                >
                  Adaugă
                </button>
              </form>
            ) : (
              <p>
                <Link to="/login" className="text-cyan-400 hover:underline">
                  Conectează-te
                </Link>{" "}
                pentru a lăsa o recenzie.
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="mt-4 space-y-4">
            {product.reviews.length === 0 ? (
              <p>Produsul nu are încă recenzii.</p>
            ) : (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1A1A1A] p-4 rounded-lg flex justify-between items-start"
                >
                  <div className="flex flex-col">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-white mt-2">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                  <p className="text-white ml-4">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 3 && (
          <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <SmallProduct key={product._id} product={product} />
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
