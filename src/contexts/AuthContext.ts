import { createContext } from "react";
import { User } from "../utils/models";

export const AuthContext = createContext({
  user: {} as User,
});
