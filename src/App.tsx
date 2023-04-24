import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import { UnAuthContext } from "./contexts/UnAuthContext";
import { auth } from "./lib/firebase";
import { useUserInfo } from "./utils/hooks";
import { User } from "./utils/models";
import { authRouter, unAuthRouter } from "./utils/routes";

function App() {
  const [user, setUser] = useState<User>();
  const { logout } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user !== null) {
        let newUser: User = {} as User;
        newUser.id = user.uid;
        newUser.email = user.email ? user.email : "";
        setUser(newUser);
        setLoggedIn(!!user);
      } else {
        setUser(undefined);
        setLoggedIn(false);
      }
      console.log("Our user is: ", user);
    });
    return cleanup;
  }, [loggedIn, loading]);

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user, setUser, logout }}>
          <RouterProvider router={authRouter}></RouterProvider>
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
