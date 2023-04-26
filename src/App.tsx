import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, RouterProvider, useNavigate } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import { UnAuthContext } from "./contexts/UnAuthContext";
import { auth } from "./lib/firebase";
import { useUserInfo } from "./utils/hooks";
import { User } from "./utils/models";
import { authRouter, unAuthRouter } from "./utils/routes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>();
  // const navigate = useNavigate();

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        let newUser: User = {} as User;
        newUser.id = user.uid;
        newUser.email = user.email ? user.email : "";
        setUser(newUser);
        setLoggedIn(!!user);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
      console.log("Our user is: ", user);
    });
    // navigate(loggedIn ? "/profile" : "/home");
    return cleanup;
  }, [loggedIn]);

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user }}>
          <RouterProvider router={authRouter}></RouterProvider>
        </AuthContext.Provider>
      ) : (
        <UnAuthContext.Provider value={{ loggedIn }}>
          <RouterProvider router={unAuthRouter} />
        </UnAuthContext.Provider>
      )}
    </>
  );
}

export default App;
