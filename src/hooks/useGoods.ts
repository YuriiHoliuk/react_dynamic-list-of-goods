import { useState } from 'react';
import { goodsFromServer } from '../constants';
import { Good, NewGood } from '../typedefs';

let lastId = 3;

export type UseGoodsResult = [
  Good[],
  {
    addGood: (NewGood: NewGood) => void;
    toggleGood: (id: number) => void;
    renameGood: (id: number, name: string) => void;
    removeGood: (id: number) => void;
  },
];

export const useGoods = (): UseGoodsResult => {
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

  return [
    goods,
    {
      removeGood,
      addGood,
      renameGood,
      toggleGood,
    },
  ];
};
