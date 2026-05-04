import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LandingLayout from "../components/layout/LandingLayout";
import Home from "../pages/Home";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import About from "../pages/About";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Links from "../pages/Links";
import Analysis from "../pages/Analysis";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  // Landing Pages Wrapper
  {
    element: <LandingLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <Features /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ]
  },
  
  // Auth
  {
    path: "/login",
    element: <Login />,
  },

  // Dashboard Layout Wrapper
  {
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/links", element: <Links /> },
      { path: "/analysis", element: <Analysis /> },
      { path: "/settings", element: <Settings /> },
    ],
  },

  // Optional fallback
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}