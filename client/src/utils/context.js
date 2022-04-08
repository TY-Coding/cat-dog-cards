import { createContext, useContext } from 'react';

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}
