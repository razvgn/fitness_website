import React from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        fontFamily: "Inter, sans-serif", // Font aplicat la tot graficul
      },
      tooltip: {
        theme: "dark",
        style: {
          fontFamily: "Inter, sans-serif", // Font pentru tooltip
        },
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif", // Font pentru etichete
          colors: ["#FFFFFF"], // Setează textul alb pentru etichete
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Tendința Vânzărilor",
        align: "left",
        style: {
          fontFamily: "Inter, sans-serif", // Font pentru titlul graficului
          color: "#FFFFFF", // Text alb pentru titlul graficului
        },
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [], // Aici adaugi datele
        title: {
          text: "Dată",
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px", // Font pentru titlul axei X
            color: "#FFFFFF", // Text alb pentru titlul axei X
          },
        },
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px", // Font pentru etichetele axei X
            colors: ["#FFFFFF"], // Text alb pentru etichetele axei X
          },
        },
      },
      yaxis: {
        title: {
          text: "Vânzări (lei)",
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px", // Font pentru titlul axei Y
            color: "#FFFFFF", // Text alb pentru titlul axei Y
          },
        },
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px", // Font pentru etichetele axei Y
            colors: ["#FFFFFF"], // Text alb pentru etichetele axei Y
          },
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: ["#FFFFFF"], // Text alb pentru etichetele legendei
          fontFamily: "Inter, sans-serif",
          fontSize: "14px", // Font pentru etichetele legendei
        },
      },
    },
    series: [{ name: "Vânzări", data: [] }], // Datele din grafic
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Vânzări", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <section className="bg-neutral-500 min-h-screen flex flex-col items-center pt-[5rem] pb-[2rem] px-4">
      <div className="text-center">
        <h1 className="h1 text-white mb-8 mt-[2rem]">
          Panou de Control<span className="text-cyan-400">.</span>
        </h1>
      </div>
      <AdminMenu />
      <div className="w-full flex flex-wrap justify-around">
        <div className="rounded-lg bg-[#1A1A1A] p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-cyan-400 text-center p-3">
            <span className="text-white">$</span>
          </div>

          <p className="mt-5 text-white">Vânzări</p>
          <h1 className="text-xl font-bold text-white">
            {isLoading ? <Loader /> : `${sales?.totalSales?.toFixed(2)} lei`}
          </h1>
        </div>
        <div className="rounded-lg bg-[#1A1A1A] p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-cyan-400 text-center p-3">
            <span className="text-white">👥</span>
          </div>

          <p className="mt-5 text-white">Clienți</p>
          <h1 className="text-xl font-bold text-white">
            {loading ? <Loader /> : customers?.length}
          </h1>
        </div>
        <div className="rounded-lg bg-[#1A1A1A] p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-cyan-400 text-center p-3">
            <span className="text-white">📦</span>
          </div>

          <p className="mt-5 text-white">Total Comenzi</p>
          <h1 className="text-xl font-bold text-white">
            {loadingTwo ? <Loader /> : orders?.totalOrders}
          </h1>
        </div>
      </div>

      <div className="w-[50%] mt-[4rem]">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="100%"
        />
      </div>

      <div className="w-full mt-[4rem]">
        <OrderList />
      </div>
    </section>
  );
};

export default AdminDashboard;
