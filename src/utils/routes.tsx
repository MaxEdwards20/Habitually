import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Calendar } from "../pages/Calendar";
import { CreateAccount } from "../pages/CreateAccount";
import { HabitMap } from "../pages/HabitMap";
import { Home } from "../pages/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";

export const router = createHashRouter([
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
        element: <HabitMap></HabitMap>,
      },

      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);
