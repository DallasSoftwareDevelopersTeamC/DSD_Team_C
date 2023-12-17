import React, { useContext } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { OrdersContext } from "./contexts/orders.context";
import { AuthContext } from "./contexts/auth.context";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DemoControls from "./components/DemoControls.jsx";
import OrderedDeliveredPopup from "./components/Inventory/modals/OrderedDeliveredPopup.jsx";
import { Toaster } from "react-hot-toast";

export default function AppRouterContent() {
  const { isLoggedIn } = useContext(AuthContext);
  const { displayOrderedDeliveredPopup } = useContext(OrdersContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get("demo") === "true";

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
            isDemo) }
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
