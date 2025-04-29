import { createContext, useContext, useState } from "react";

const SwitchContext = createContext();

export function SwitchProvider({ children }) {
  const [activeForm, setActiveForm] = useState("inscription");

  return (
    <SwitchContext.Provider value={{ activeForm, setActiveForm }}>
      {children}
    </SwitchContext.Provider>
  );
}

export function useSwitchContext() {
  return useContext(SwitchContext);
}
