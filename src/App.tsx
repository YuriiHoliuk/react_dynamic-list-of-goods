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
    goodsMeta,
  ] = useGoods();

  return (
    <div className="root">
      <GoodsContextProvider
        {...goodsMeta}
      >
        <NewGoodForm />

        <Goods
          goods={goods}
        />
      </GoodsContextProvider>
    </div>
  );
};
