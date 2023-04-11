import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { OrdersContext } from './contexts/orders.context';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DemoControls from './components/DemoControls.jsx';
import { useQuery } from 'react-query';
import { authenticateUser } from './services/authenticationAPIcalls.js';
import ScaleLoader from 'react-spinners/ScaleLoader.js';
import OrderedDeliveredPopup from './components/Inventory/popups/OrderedDeliveredPopup.jsx';



export default function AppRouterContent() {
  const { displayOrderedDeliveredPopup, setDisplayOrderedDeliveredPopup } = useContext(OrdersContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get('demo') === 'true';
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const { data, isError, isLoading } = useQuery(
    'authenticateUser',
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data.id) {
          return setUserIsLoggedIn(true);
        }
      },
    }
  );
  useEffect(() => {
    authenticateUser();
  }, []);



  return (
    <>
      {
        displayOrderedDeliveredPopup &&
        <OrderedDeliveredPopup />
      }
      {isLoading ? (
        <div className="scale-loader-container">
          <ScaleLoader
            color={'#3b9893'}
            loading={isLoading}
            height={200}
            width={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Routes>
            {userIsLoggedIn ? (
              <Route path="/" element={<InventoryPage />} />
            ) : (
              <Route path="/" element={<LoginPage />} />
            )}
            {userIsLoggedIn ? (
              <>
                {' '}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />


              </>
            ) : (
              <Route path="/*" element={<Navigate to="/" />} />
            )}
          </Routes>

          {userIsLoggedIn &&
            (location.pathname === '/orders' ||
              location.pathname === '/' ||
              isDemo) && <DemoControls />}
        </>
      )}



    </>
  );
}
