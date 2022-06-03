import { useEffect, useCallback } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { Good, NewGood } from '../typedefs';
import {
  Action, loadGoods, State,
  setGoods,
} from '../store';

let lastId = 3;

export type UseGoodsResult = [
  Good[],
  {
    addGood: (NewGood: NewGood) => void;
    toggleGood: (id: number) => void;
    renameGood: (id: number, name: string) => void;
    removeGood: (id: number) => void;
    isLoading: boolean;
    error: string | null;
  },
];

const useSelectStore = <MappedState>(
  mapper: (state: State) => MappedState,
): MappedState => {
  return useSelector<State, MappedState>(mapper);
};

const useCustomDispatch = (): ThunkDispatch<State, undefined, Action> => {
  const dispatch: ThunkDispatch<State, undefined, Action> = useDispatch();

  return dispatch;
};

export const useGoods = (): UseGoodsResult => {
  const {
    goods,
    error,
    isLoading,
  } = useSelectStore((state) => state);

  const dispatch = useCustomDispatch();

  const saveGoods = useCallback((newGoods: Good[]) => {
    dispatch(setGoods(newGoods));
  }, [dispatch, setGoods]);

  useEffect(() => {
    dispatch(loadGoods());
  }, []);

  const toggleGood = (id: number): void => {
    saveGoods(goods.map(currentGood => {
      if (currentGood.id === id) {
        return {
          ...currentGood,
          isActive: !currentGood.isActive,
        };
      }

      return currentGood;
    }));
  };

  const renameGood = (id: number, updatedName: string): void => {
    saveGoods(goods.map(currentGood => {
      if (currentGood.id === id) {
        return {
          ...currentGood,
          name: updatedName,
        };
      }

      return currentGood;
    }));
  };

  const addGood = (newGood: NewGood) => {
    saveGoods([
      ...goods,
      {
        ...newGood,
        id: ++lastId,
      },
    ]);
  };

  const removeGood = (id: number) => {
    saveGoods(goods.filter(currentGood => (
      currentGood.id !== id
    )));
  };

  return [
    goods,
    {
      removeGood,
      addGood,
      renameGood,
      toggleGood,
      isLoading,
      error,
    },
  ];
};
