import { createContext, useContext } from "react";

type User = {
  id: string;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};