import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { CreateAccount } from "../pages/CreateAccount";
import { Home } from "../pages/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <NavBar></NavBar>,
        children: [
          {
            path: "/",
            element: <Home></Home>,
          },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "create-account",
            element: <CreateAccount></CreateAccount>,
          },
          { path: "*", element: <Navigate to="home" replace /> },
        ],
      },
    ],
  },
]);

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <NavBar></NavBar>,
        children: [
          {
            path: "/",
            element: <Home></Home>,
          },
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "create-account",
            element: <CreateAccount></CreateAccount>,
          },
          { path: "*", element: <Navigate to="home" replace /> },
        ],
      },
    ],
  },
]);
