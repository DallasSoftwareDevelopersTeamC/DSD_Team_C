import React, { useContext } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { OrdersContext } from "./contexts/orders.context";
import { AuthContext } from "./contexts/auth.context";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DemoControls from "./components/DemoControls.jsx";
import { useQuery } from "react-query";
import { authenticateUser } from "./services/authenticationAPIcalls.js";
import OrderedDeliveredPopup from "./components/Inventory/popups/OrderedDeliveredPopup.jsx";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#FFF",
            borderRadius: "9999px",
            color: "#333",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}
