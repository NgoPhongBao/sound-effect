"use client";

import { createContext, ReactNode, useContext } from "react";
import { User } from "@/types";

export interface AppContextState {
  user: User | null;
}

export const AppContext = createContext<AppContextState>({
  user: null,
});

const AppProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
