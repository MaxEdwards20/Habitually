import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UnAuthContext } from "./contexts/UnAuthContext";
import { auth } from "./lib/firebase";
import { useUserInfo } from "./utils/hooks";
import { User } from "./utils/models";
import { authRouter, unAuthRouter } from "./utils/routes";

function App() {
  const { user, setUser, logout } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user !== null) {
        setUser(user as unknown as User);
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
    // TODO: Look into authRouter and unAuthRouter docs to see why they won't show anything
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
