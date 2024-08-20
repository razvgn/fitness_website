import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // Inițializare ca string gol
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity || 0);
      setBrand(productData.brand || "");
      setStock(productData.countInStock || 0);
      setImage(productData.image || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Imaginea a fost încărcată cu succes", {
        position: "top-right",
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Încărcarea imaginii a eșuat. Încearcă din nou.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Produsul a fost actualizat.`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Actualizarea produsului a eșuat. Încearcă din nou.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Ești sigur că dorești să ștergi acest produs?"
      );
      if (!answer) return;

      const response = await deleteProduct(params._id);
      if (response && response.data && response.data.name) {
        toast.success(`Produsul "${response.data.name}" a fost șters.`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Ștergerea produsului nu a fost finalizată corect.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Ștergerea produsului a eșuat. Încearcă din nou.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="bg-neutral-500 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-md">
        <AdminMenu />
        <h1 className="h1 text-white mb-8 mt-[6rem] text-center">
          Actualizează produs<span className="text-cyan-400">.</span>
        </h1>

        {image && (
          <div className="text-center mb-6">
            <img
              src={image}
              alt="product"
              className="block mx-auto max-h-[200px] rounded-md"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "Incarcă o imagine"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className="text-white"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-2xl">
          <div>
            <label htmlFor="name" className="text-white block mb-2 ">
              Nume:
            </label>
            <input
              type="text"
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="text-white block mb-2">
              Preț:
            </label>
            <input
              type="number"
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity" className="text-white block mb-2">
              Cantitate:
            </label>
            <input
              type="number"
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand" className="text-white block mb-2">
              Brand:
            </label>
            <input
              type="text"
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="text-white block mb-2">
              Descriere:
            </label>
            <textarea
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="stock" className="text-white block mb-2">
              În Stoc:
            </label>
            <input
              type="number"
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="text-white block mb-2">
              Categorie:
            </label>
            <select
              className="w-full p-4 mb-3 border rounded-lg bg-[#101011] text-white"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Selectează o categorie</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex  space-x-10">
          <button
            onClick={handleSubmit}
            className="btn btn-primary text-xl h-[4rem] w-[25rem] px-4 py-2 rounded my-[0.5rem] transition duration-300"
          >
            Actualizează
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-primary text-xl h-[4rem] w-[25rem] px-4 py-2 rounded my-[0.5rem] transition duration-300"
          >
            Șterge
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductUpdate;
