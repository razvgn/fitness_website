import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (order && !order.isPaid) {
      // Dacă ai nevoie să încarci un script pentru un alt proces de plată, îl poți face aici
    }
  }, [order]);

  const handlePayment = async () => {
    try {
      console.log("Initiating payment for order:", orderId);

      // Exemplu de simulare a unei plăți
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // După ce plata este procesată cu succes:
      const paymentData = {
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: { email_address: userInfo.email },
      };

      console.log("Sending payment data:", paymentData);

      await payOrder({
        orderId,
        details: paymentData,
      });

      refetch();
      toast.success("Plata comenzii s-a realizat.");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Comanda a fost marcată ca livrată.");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 bg-[#1A1A1A] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Produse Comandate
            </h2>
            {order.orderItems.length === 0 ? (
              <Message variant="warning">Comanda este goală</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="bg-[#2C2C2C]">
                      <th className="p-3 text-left text-cyan-400">Imagine</th>
                      <th className="p-3 text-left text-cyan-400">Produs</th>
                      <th className="p-3 text-center text-cyan-400">
                        Cantitate
                      </th>
                      <th className="p-3 text-center text-cyan-400">
                        Preț Unitate
                      </th>
                      <th className="p-3 text-center text-cyan-400">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-700">
                        <td className="p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="p-2">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-cyan-400 hover:underline"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-center">
                          {item.price.toFixed(2)} lei
                        </td>
                        <td className="p-2 text-center">
                          {(item.qty * item.price).toFixed(2)} lei
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="md:w-1/3 bg-[#1A1A1A] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Rezumatul Comenzii
            </h2>
            <div className="text-white space-y-4">
              <div>
                <strong className="text-cyan-400">ID Comandă:</strong>{" "}
                {order._id}
              </div>
              <div>
                <strong className="text-cyan-400">Nume:</strong>{" "}
                {order.user.username}
              </div>
              <div>
                <strong className="text-cyan-400">Email:</strong>{" "}
                {order.user.email}
              </div>
              <div>
                <strong className="text-cyan-400">Adresă:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </div>
              <div>
                <strong className="text-cyan-400">Metodă de Plată:</strong>{" "}
                {order.paymentMethod}
              </div>
              {order.isPaid ? (
                <Message variant="success">
                  Plătit pe {new Date(order.paidAt).toLocaleString("ro-RO")}
                </Message>
              ) : (
                <Message variant="danger">Neplătit</Message>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                Sumar Costuri
              </h3>
              <div className="flex justify-between text-white mb-2">
                <span>Produse</span>
                <span>{order.itemsPrice.toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between text-white mb-2">
                <span>Livrare</span>
                <span>{order.shippingPrice.toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between text-white mb-2">
                <span>Taxe</span>
                <span>{order.taxPrice.toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg mb-2">
                <span>Total</span>
                <span>{order.totalPrice.toFixed(2)} lei</span>
              </div>
              {!order.isPaid && (
                <div>
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <button
                      onClick={handlePayment}
                      className="bg-cyan-500 text-white py-2 px-4 rounded-full"
                    >
                      Plătește acum
                    </button>
                  )}
                </div>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    type="button"
                    className="bg-cyan-400 hover:bg-cyan-500 text-white w-full py-2 rounded-full transition-all duration-200"
                    onClick={deliverHandler}
                  >
                    Marchează ca Livrată
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
