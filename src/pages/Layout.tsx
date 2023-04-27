import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { User } from "../utils/models";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user !== null) {
        let newUser: User = {} as User;
        newUser.id = user.uid;
        newUser.email = user.email ? user.email : "";
        setUser(newUser);
        setLoggedIn(!!newUser);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
      console.log("Our user is: ", user);
    });
    navigate(loggedIn ? "/profile" : "/home");
    return cleanup;
  }, [loggedIn, loading]);

  return (
    <AuthContext.Provider value={user as User}>
      <>
        <NavBar></NavBar>
        {loading ? <div>Loading...</div> : <Outlet />}
      </>
    </AuthContext.Provider>
  );
};
