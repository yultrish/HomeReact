import { useContext } from "react";
import { AuthContext } from "./ContextAuth";

export const useAuth = () => {
  return useContext(AuthContext);
};
