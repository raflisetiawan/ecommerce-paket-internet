import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import MainLayout from "../layouts/MainLayout";
import CustomerPage from "../pages/CustomerPage";
import CheckoutPage from "../pages/CheckoutPage";
import ThankYouPage from "../pages/ThankYouPage";
import PromotionsPage from "../pages/PromotionsPage";
import AllPackagesPage from "../pages/AllPackagesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customer",
        element: (
          <ProtectedRoute>
            <CustomerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/purchase/:packageId", 
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/thankyou/:orderId", 
        element: (
          <ProtectedRoute>
            <ThankYouPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/promo", 
        element: (
          <ProtectedRoute>
            <PromotionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/packages", 
        element: (
          <ProtectedRoute>
            <AllPackagesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
]);


  export default router;