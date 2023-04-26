import { createContext } from "react";
import { User } from "../utils/models";

export const UnAuthContext = createContext({
  loggedIn: false,
});
