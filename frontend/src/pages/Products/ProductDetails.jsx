import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Recenzia a fost adăugată cu succes.");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate("/cart");
  };

  return (
    <section className="bg-neutral-500 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="mt-9">
          <Link
            to="/shop"
            className="text-white font-semibold hover:underline mb-4 inline-block mt-[2rem]"
          >
            Înapoi
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-2/3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg mb-6 lg:mb-0"
                />
              </div>

              <div className="lg:w-1/3 flex flex-col space-y-4">
                <h2 className="text-white text-3xl font-semibold">
                  {product.name}
                </h2>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-3xl font-extrabold text-white">
                  {product.price} lei
                </p>

                <div className="space-y-4">
                  <div className="text-white">
                    <p className="flex items-center">
                      <FaStore className="mr-2" /> Brand: {product.brand}
                    </p>
                    <p className="flex items-center">
                      <FaClock className="mr-2" /> Adăugat:{" "}
                      {moment(product.createdAt).format("YYYY-MM-DD")}
                    </p>
                    <p className="flex items-center">
                      <FaStar className="mr-2" /> Recenzii: {product.numReviews}
                    </p>
                  </div>

                  <div className="text-white">
                    <p className="flex items-center">
                      <FaShoppingCart className="mr-2" /> Cantitate:{" "}
                      {product.quantity}
                    </p>
                    <p className="flex items-center">
                      <FaBox className="mr-2" /> În stoc: {product.countInStock}
                    </p>
                  </div>

                  {product.countInStock > 0 && (
                    <div className="flex items-center space-x-4">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 rounded-lg text-black"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className="btn btn-primary px-4 py-2 rounded-lg"
                      >
                        Adaugă în coș
                      </button>
                    </div>
                  )}

                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} recenzii`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
