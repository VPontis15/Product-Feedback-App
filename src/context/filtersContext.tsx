import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

// Define the context type
type FiltersContextType = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
} | null; // Include null for initial value

// Create the context with proper typing and a null initial value
const FiltersContext = createContext<FiltersContextType>(null);

export default function FiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filter, setFilter] = useState<string>('All');

  const value: FiltersContextType = {
    filter,
    setFilter,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}
//  // Custom hook to use the FiltersContext
export function useFiltersContext() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
}
