import React from "react";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Ești sigur că dorești să ștergi acest cont?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section
      className="bg-neutral-500 min-h-screen
     flex justify-center pt-[7rem] pb-[1rem] w-full"
    >
      <div className="w-full text-center">
        <div
          className="text-white flex flex-col w-full"
          // data-aos="fade-down"
          // data-aos-delay="500"
        >
          <AdminMenu />
          <h1 className="h1 text-white mt-[2rem]">
            Listă de utilizatori<span className="text-cyan-400">.</span>
          </h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="overflow-x-auto pt-[3rem]">
              {/* AdminMenu */}
              <table className="w-full ">
                <thead className="">
                  <tr>
                    <th className="px-[6rem] py-4 text-left">ID</th>
                    <th className="px-[6rem] py-4 text-left ">NUME</th>
                    <th className="px-[3rem] py-4 text-left ">EMAIL</th>
                    <th className="px-[2.5rem] py-4 text-left">ADMIN</th>
                    <th className="px-[3.5rem] py-4 text-left ">ACTIUNI</th>
                  </tr>
                </thead>
                <tbody className="">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-[6rem] py-4 text-left ">{user._id}</td>
                      <td className="px-[6rem] py-4 text-left">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) =>
                                setEditableUserName(e.target.value)
                              }
                              className="p-2 border rounded-lg text-black"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-cyan-400 py-2 px-4 rounded-lg"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {user.username}{" "}
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                            >
                              <FaEdit className="ml-[1rem]" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-[3rem] py-4 text-left">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserEmail}
                              onChange={(e) =>
                                setEditableUserEmail(e.target.value)
                              }
                              className="w-full p-2 border rounded-lg text-black"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-cyan-500 text-white py-2 px-4 rounded-lg"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.name, user.email)
                              }
                            >
                              <FaEdit className="ml-[1rem]" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="px-[4rem] py-4 text-left">
                        {user.isAdmin ? (
                          <FaCheck style={{ color: "cyan" }} />
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td className="px-[4rem] py-4 text-left">
                        {!user.isAdmin && (
                          <div className="flex">
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
