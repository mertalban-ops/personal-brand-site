"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type RobotProjectType =
  | "stockapp"
  | "auto-service"
  | "carpass"
  | "business-dashboard";

interface ActiveProjectCtx {
  activeType: RobotProjectType | null;
  setActiveType: (t: RobotProjectType | null) => void;
}

const ActiveProjectContext = createContext<ActiveProjectCtx>({
  activeType: null,
  setActiveType: () => {},
});

export function ActiveProjectProvider({ children }: { children: ReactNode }) {
  const [activeType, setActiveType] = useState<RobotProjectType | null>(null);
  return (
    <ActiveProjectContext.Provider value={{ activeType, setActiveType }}>
      {children}
    </ActiveProjectContext.Provider>
  );
}

export function useActiveProject() {
  return useContext(ActiveProjectContext);
}
