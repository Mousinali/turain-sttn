import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Links from "../pages/Links";
import Analysis from "../pages/Analysis";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // Dashboard Layout Wrapper
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/links",
        element: <Links />,
      },
      {
        path: "/analysis",
        element: <Analysis />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
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