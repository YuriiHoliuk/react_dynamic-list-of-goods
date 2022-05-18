import {
  FC, useState,
} from 'react';
import './App.scss';
import { Goods } from './components/Goods';
import { NewGoodForm } from './components/NewGoodForm';
import { goodsFromServer } from './constants';
import { Good, NewGood } from './typedefs';

let lastId = 3;

export const App: FC = () => {
  const [goods, setGoods] = useState<Good[]>(goodsFromServer);

  const toggleGood = (id: number): void => {
    setGoods((currentGoods) => (
      currentGoods.map(currentGood => {
        if (currentGood.id === id) {
          return {
            ...currentGood,
            isActive: !currentGood.isActive,
          };
        }

        return currentGood;
      })
    ));
  };

  const renameGood = (id: number, updatedName: string): void => {
    setGoods((currentGoods) => (
      currentGoods.map(currentGood => {
        if (currentGood.id === id) {
          return {
            ...currentGood,
            name: updatedName,
          };
        }

        return currentGood;
      })
    ));
  };

  const addGood = (newGood: NewGood) => {
    setGoods((currentGoods) => (
      [
        ...currentGoods,
        {
          ...newGood,
          id: ++lastId,
        },
      ]
    ));
  };

  const removeGood = (id: number) => {
    setGoods((currentGoods) => (
      currentGoods.filter(currentGood => (
        currentGood.id !== id
      ))
    ));
  };

  return (
    <>
      <NewGoodForm
        onAdd={addGood}
      />

      <Goods
        goods={goods}
        onRemove={removeGood}
        onRename={renameGood}
        onToggle={toggleGood}
      />
    </>
  );
};
