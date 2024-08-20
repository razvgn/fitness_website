import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    if (selectedBrand === brand) {
      setSelectedBrand("");
      dispatch(setProducts(filteredProductsQuery.data));
    } else {
      setSelectedBrand(brand);
      const productsByBrand = filteredProductsQuery.data?.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productsByBrand));
    }
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8 mt-[5rem]">
          Magazin<span className="text-cyan-400">.</span>
        </h1>
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row mt-8">
        {/* Secțiunea de Filtre */}
        <aside className="lg:w-1/4 bg-[#151515] p-6 rounded-lg lg:mr-8">
          <div className="bg-black p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filtrează după categorii
            </h2>
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="mr-2 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <div className="bg-black p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filtrează după branduri
            </h2>
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2">
                <label className="flex items-center text-white">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => handleBrandClick(brand)}
                    className="mr-2 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <div className="bg-black p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filtrează după preț
            </h2>
            <input
              type="text"
              placeholder="Introdu prețul"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-cyan-300"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-cyan-400 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 transition duration-300"
              onClick={() => window.location.reload()}
            >
              Resetează filtrele
            </button>
          </div>
        </aside>

        {/* Secțiunea de Produse */}
        <div className="lg:w-3/4">
          <h2 className="text-2xl text-white mb-4">
            {products?.length} Produse
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => <ProductCard p={p} key={p._id} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
