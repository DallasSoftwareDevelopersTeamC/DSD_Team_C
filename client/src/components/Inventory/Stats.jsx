import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/config';
import axios from 'axios';

function Stats() {
    const [data, setData] = useState({
        totalInventoryItems: 0,
        totalActiveOrders: 0,
        totalSales: 0
    });

    useEffect(() => {
        axios.get(`${API_URL}/inventory/stats`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className='flex text-zinc-800 gap-6'>
            <div className='bg-zinc-100 rounded-2xl p-4'>
                <h3>Total Inventory Items:</h3>
                <p>{data.totalInventoryItems}</p>
            </div>
            <div className='bg-zinc-100 rounded-2xl p-4'>
                <h3>Total Active Orders:</h3>
                <p>{data.totalActiveOrders}</p>
            </div>
            <div className='bg-zinc-100 rounded-2xl p-4'>
                <h3>Total Sales:</h3>
                <p>${data.totalSales.toFixed(2)}</p> 
    
            </div>
        </div>
    );
}

export default Stats;
