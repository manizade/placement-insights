import { createContext, useContext, useState, type ReactNode } from "react";
import type { Grade } from "@/types";

export interface FilterState {
  exam: string;
  grade: Grade | "";
  classId: string;
  studentId: string;
}

const defaultState: FilterState = {
  exam: "",
  grade: "",
  classId: "",
  studentId: "",
};

interface FiltersContextValue {
  filters: FilterState;
  setFilters: (next: FilterState) => void;
  patchFilters: (patch: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultState);

  const patchFilters = (patch: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const resetFilters = () => setFilters(defaultState);

  return (
    <FiltersContext.Provider value={{ filters, setFilters, patchFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
}
