import {
  FC,
} from 'react';
import './App.scss';
import { Goods } from './components/Goods';
import { NewGoodForm } from './components/NewGoodForm';
import { GoodsContextProvider } from './GoodsContext';
import { useGoods } from './hooks/useGoods';

export const App: FC = () => {
  const [
    goods,
    callbacks,
  ] = useGoods();

  return (
    <>
      <GoodsContextProvider
        {...callbacks}
      >
        <NewGoodForm />

        <Goods
          goods={goods}
        />
      </GoodsContextProvider>
    </>
  );
};
