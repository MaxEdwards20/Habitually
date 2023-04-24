import { useEffect, useState } from "react";
import { Api } from "../api/api";
import { User } from "./models";
import { getToken, removeToken } from "./tokenFunctions";

type UserInfo = () => {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>();
  const logout = () => {
    removeToken();
    setUser(undefined);
  };

  useEffect(() => {
    if (user) return;
    if (!getToken()) return;
  }, []);

  return { user, setUser, logout };
};
