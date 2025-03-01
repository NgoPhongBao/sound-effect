"use client";

import { createContext, ReactNode, useContext } from "react";
import { Category, User } from "@/types";

export interface AppContextState {
  user: User | null;
  categories: Category[] | null;
}

export const AppContext = createContext<AppContextState>({
  user: null,
  categories: null,
});

const AppProvider = ({
  children,
  user,
  categories,
}: {
  children: ReactNode;
  user: User | null;
  categories: Category[] | null;
}) => {
  return (
    <AppContext.Provider value={{ user, categories }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
