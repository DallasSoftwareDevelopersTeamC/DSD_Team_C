import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import InventoryContent from '../components/Inventory/Inventory.jsx';
import OrdersPreview from '../components/Orders/OrdersPreview';
import { authenticateUser } from '../services/authenticationAPIcalls.js';
import { getCompany } from '../services/companyAPIcalls.js';

import './invOrdContainer.css';

function InventoryPage() {
  const [companyName, setCompanyName] = useState(null);
  const [username, setUsername] = useState(null);
  const { data } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: async (data) => {
      if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
        setUsername(data.username);
        setCompanyName(await getCompany(data.companyID));
      }
    },
  });
  return (
    <>
      <div className="inventory-orders-container">
        <div className="inventory-section">
          <InventoryContent />
        </div>
        <div className="orders-section">
          <OrdersPreview />
        </div>
        <div className="user-info">
          <p className="username">Username: {username}</p>
          <p>Company: {companyName?.companyName}</p>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
