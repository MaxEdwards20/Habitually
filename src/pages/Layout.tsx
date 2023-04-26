import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { User } from "../utils/models";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

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
    navigate(loggedIn ? "/profile" : "/home");
    return cleanup;
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={user as User}>
      <Outlet />
    </AuthContext.Provider>
  );
};
