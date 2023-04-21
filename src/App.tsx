import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UnAuthContext } from "./contexts/UnAuthContext";
import { useUserInfo } from "./utils/hooks";
import { authRouter, unAuthRouter } from "./utils/routes";

function App() {
  const { user, setUser, logout } = useUserInfo();

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user, setUser, logout }}>
          <RouterProvider router={authRouter} />
        </AuthContext.Provider>
      ) : (
        <UnAuthContext.Provider value={{ setUser }}>
          <RouterProvider router={unAuthRouter} />
        </UnAuthContext.Provider>
      )}
    </>
  );
}

export default App;
