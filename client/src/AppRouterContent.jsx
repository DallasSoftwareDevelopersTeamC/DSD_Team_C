import React, { useContext } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { OrdersContext } from "./contexts/orders.context";
import { AuthContext } from "./contexts/auth.context";
import Dashboard from "./pages/Dashboard.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DemoControls from "./components/DemoControls.jsx";
import { useQuery } from "react-query";
import { authenticateUser } from "./services/authenticationAPIcalls.js";
import OrderedDeliveredPopup from "./components/Inventory/popups/OrderedDeliveredPopup.jsx";

export default function AppRouterContent() {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);
  const { displayOrderedDeliveredPopup } = useContext(OrdersContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get("demo") === "true";

  useQuery("authenticateUser", authenticateUser, {
    onSuccess: (data) => {
      if (data.id) {
        toggleLogin();
      }
    },
    onError: (error) => {
      if (error.message === "Token expired") {
        window.location.href = "/login";
      }
    },
    retry: 0,
  });

  return (
    <>
      {displayOrderedDeliveredPopup && <OrderedDeliveredPopup />}
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
          {(location.pathname === "/orders" ||
            location.pathname === "/" ||
            isDemo) && <DemoControls />}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
