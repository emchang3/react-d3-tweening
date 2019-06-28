import { createContext } from 'react';

export const DataContext = createContext([4, 8, 12, 16, 20]);

export const TargetsContext = createContext([4, 8, 12, 16, 20]);

export const RadialContext = createContext([1, 1, 1, 1, 1]);

export const SliceContext = createContext({
  currentSlice: null,
  setCurrentSlice: (slice: number) => undefined
});

export const SocketContext = createContext(false);
