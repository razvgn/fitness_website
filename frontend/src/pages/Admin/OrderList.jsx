import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const AdminOrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="h1 text-white mb-8 mt-[2rem]">
          Toate comenzile<span className="text-cyan-400">.</span>
        </h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto w-full">
          <AdminMenu />
          <table className="w-full text-white">
            <thead>
              <tr className="bg-[#1A1A1A]">
                <th className="py-3 px-4 text-left">Imagine</th>
                <th className="py-3 px-4 text-left">ID Comandă</th>
                <th className="py-3 px-4 text-left">Utilizator</th>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-center">Status plată</th>
                <th className="py-3 px-4 text-center">Status livrare</th>
                <th className="py-3 px-4 text-center">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-neutral-700 hover:bg-neutral-600"
                >
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {order.totalPrice.toFixed(2)} lei
                  </td>
                  <td className="py-2 px-4 text-center">
                    {order.isPaid ? (
                      <p className="p-1 bg-green-500 text-white rounded-full">
                        Plătită
                      </p>
                    ) : (
                      <p className="p-1 bg-red-500 text-white rounded-full">
                        Neplătită
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {order.isDelivered ? (
                      <p className="p-1 bg-green-500 text-white rounded-full">
                        Livrată
                      </p>
                    ) : (
                      <p className="p-1 bg-red-500 text-white rounded-full">
                        Nelivrată
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-cyan-500 text-white py-2 px-3 rounded-full hover:bg-cyan-600 transition-all duration-200">
                        Detalii
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminOrderList;
