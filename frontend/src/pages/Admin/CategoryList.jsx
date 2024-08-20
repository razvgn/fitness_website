import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  console.log(categories);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Trebuie introdus un nume.");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`Categoria ${result.name} a fost creată.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Crearea categoriei a eșuat. Incearcă din nou.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Trebuie introdus un nume.");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Categoria ${result.name} a fost actualizată.`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Categoria ${result.name} a fost ștearsă.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ștergerea categoriei a eșuat. Încearcă din nou!");
    }
  };

  return (
    <section
      className="bg-neutral-500 min-h-screen
 flex justify-center pt-[7rem] pb-[1rem] w-full "
    >
      <div className="">
        <div
          className="text-white flex flex-col w-full text-center "
          // data-aos="fade-down"
          // data-aos-delay="500"
        >
          <AdminMenu />
          <h1 className="h1 text-white mb-8 mt-[2rem]">
            Editare Categorii<span className="text-cyan-400">.</span>
          </h1>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
          <br />
          <hr />

          <div className="flex flex-wrap">
            {categories?.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-white border border-cyan-400 text-cyan-500 
                  py-4 px-6 rounded-lg m-3 hover:bg-cyan-400
                   hover:text-white focus:outline-none foucs:ring-2 
                   focus:ring-cyan-400 focus:ring-opacity-50 transition"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Actualizează"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
