import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import { InventoryContext } from '../contexts/inventory.context';
import { getInventoryList } from '../services/inventoryAPIcalls';
import '../components/SalesChart.css'

const SalesGraph = () => {
  const { userData } = useContext(InventoryContext);
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const data = await getInventoryList(userData);
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      fetchInventory();
    }
  }, [userData]);

  const chartData = inventory.map((item) => ({
    Name: item.productName,
    Stock: item.inStock,
    Target: item.reorderAt,
  }));

  return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Stock" fill="#8884d8" />
          <Bar dataKey="Target" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default SalesGraph;
