import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { API_URL } from "../../services/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/auth.context";
import { InventoryContext } from "../../contexts/inventory.context";
import { faBoxOpen, faChartLine, faShippingFast } from "@fortawesome/free-solid-svg-icons";

function Stats() {
  const { userId } = useContext(AuthContext);
  const { needStatsUpdate, setNeedStatsUpdate } = useContext(InventoryContext);

  const [data, setData] = useState({
    totalInventoryItems: 0,
    totalActiveOrders: 0,
    totalSales: 0,
    inventoryItemsSpark: [],
    activeOrdersSpark: [],
    salesSpark: [],
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_URL}/inventory/stats/${userId}`)
        .then((response) => {
          setData(response.data);
          setNeedStatsUpdate(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [userId, needStatsUpdate]);

  const sparkOptions = {
    chart: {
      id: "basic-bar",
      type: "line",
      height: 50,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 1
    },
    colors: ['rgb(63, 191, 128)']
  };
  

  return (
    <div className="flex text-zinc-800 gap-6 ">
      <div className="bg-zinc-100 rounded-2xl p-4 w-1/3 flex flex-col gap-2">
        <h3>
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="mr-1 text-emerald-400"
          />
          Inventory Items
        </h3>
        <p className="text-3xl font-semibold text-zinc-600">
          {data.totalInventoryItems}
        </p>
        <ReactApexChart
          options={sparkOptions}
          series={[{ data: data.inventoryItemsSpark }]}
          type="area"
        />
      </div>
      
      <div className="bg-zinc-100 rounded-2xl p-4 w-1/3 flex flex-col gap-2">
        <h3>
          <FontAwesomeIcon
            icon={faShippingFast}
            className="mr-1 text-emerald-400"
          />
          Total Active Orders:
        </h3>
        <p className="text-3xl font-semibold text-zinc-600">
          {data.totalActiveOrders}
        </p>
        <ReactApexChart
          options={sparkOptions}
          series={[{ data: data.activeOrdersSpark }]}
          type="area"
        />
      </div>
      
      <div className="bg-zinc-100 rounded-2xl p-4 w-1/3 flex flex-col gap-2">
        <h3>
          <FontAwesomeIcon icon={faChartLine} className="mr-1 text-emerald-400" />
          Total Sales:
        </h3>
        <p className="text-3xl font-semibold text-zinc-600">
          {data.totalSales.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <ReactApexChart
          options={sparkOptions}
          series={[{ data: data.salesSpark }]}
          type="area"
        />
      </div>
    </div>
  );
}

export default Stats;
