import { createContext, useContext } from 'react';

export const RoadmapContext = createContext(undefined);

export function useRoadmapContext() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmapContext must be used within a RoadmapProvider');
  }
  return context;
}
