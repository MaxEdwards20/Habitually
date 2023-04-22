import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { HeaderNav } from "../components/HeaderNav";
import CreateAccount from "../pages/CreateAccount";
import HomePage from "../pages/Home";
import { Profile } from "../pages/Profile";

import { Login } from "../pages/Login";

type RoutePath = "home" | "login" | "createAccount" | "profile";

const pathPageMap: Record<RoutePath, JSX.Element> = {
  home: <HomePage />,
  login: <Login />,
  createAccount: <CreateAccount />,
  profile: <Profile />,
};

export const unAuthRoutes: RoutePath[] = ["home", "login", "createAccount"];
export const authRoutes: RoutePath[] = ["home", "profile"];

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav auth={true} />,
    children: [
      ...generateRouteObjects(authRoutes),
      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      ...generateRouteObjects(unAuthRoutes),
      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);

function generateRouteObjects(routes: RoutePath[]): RouteObject[] {
  return routes.map((route) => {
    return {
      path: route,
      element: pathPageMap[route],
    };
  });
}
