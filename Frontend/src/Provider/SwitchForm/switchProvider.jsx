import { createContext, useContext, useState } from "react";

const SwitchContext = createContext();

export function SwitchProvider({ children }) {
  const [activeForm, setActiveForm] = useState("inscription");
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <SwitchContext.Provider value={{ activeForm, setActiveForm, isRegistered, setIsRegistered }}>
      {children}
    </SwitchContext.Provider>
  );
}

export function useSwitchContext() {
  return useContext(SwitchContext);
}
