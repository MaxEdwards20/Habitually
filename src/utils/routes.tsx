import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Calendar } from "../pages/Calendar";
import { CreateAccount } from "../pages/CreateAccount";
import { Home } from "../pages/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { HabitMap } from "../pages/HabitMap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/create-account",
        element: <CreateAccount></CreateAccount>,
      },
      {
        path: "/calendar",
        element: <Calendar></Calendar>,
      },
      {
        path: "/habit-map",
        element: <HabitMap></HabitMap>
      },

      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);
