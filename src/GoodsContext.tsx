import {
  createContext,
  FC,
  useContext,
} from 'react';
import './App.scss';
import { NewGood } from './typedefs';

export interface GoodsContextType {
  addGood: (NewGood: NewGood) => void;
  toggleGood: (id: number) => void;
  renameGood: (id: number, name: string) => void;
  removeGood: (id: number) => void;
  isLoading: boolean;
  error: string | null,
}

const GoodsContext = createContext<GoodsContextType>({
  addGood() {},
  toggleGood() {},
  renameGood() {},
  removeGood() {},
  isLoading: false,
  error: null,
});

export const GoodsContextProvider: FC<GoodsContextType> = (
  ({ children, ...props }) => (
    <GoodsContext.Provider value={props}>
      {children}
    </GoodsContext.Provider>
  )
);

export const useGoodsContext = () => (
  useContext(GoodsContext)
);
