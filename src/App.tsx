import {
  ChangeEvent, FC, useEffect, useMemo, useState,
} from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { ActiveFilter, goodsFromServer, SortBy } from './constants';
import { Good } from './typedefs';
import { filterGoods, sortGoods } from './utils';

export const App: FC = () => {
  const [goods, setGoods] = useState<Good[]>(goodsFromServer);
  const [nameFilter, setNameFilter] = useState('');
  const [count, setCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState(ActiveFilter.All);
  const [sortBy, setSortBy] = useState(SortBy.Initial);
  const [isReversed, setIsReversed] = useState(false);

  const goodsToRender = useMemo(() => {
    const filteredGoods = filterGoods(goods, nameFilter, activeFilter);
    const sortedGoods = sortGoods(filteredGoods, sortBy);

    return isReversed
      ? sortedGoods.reverse()
      : sortedGoods;
  }, [nameFilter, activeFilter, sortBy, isReversed, goods]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    const intervalId = setInterval(() => console.log(new Date()), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const addEmptyGood = () => {
    setGoods((currentGoods) => (
      [
        ...currentGoods,
        {
          id: currentGoods[currentGoods.length - 1].id + 1,
          isActive: false,
          name: '',
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

  const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  const changeActiveFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveFilter(event.target.value as ActiveFilter);
  };

  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortBy);
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  return (
    <>
      <div>
        <label style={{ display: 'block' }}>
          <p>Search by name:</p>
          <input
            type="text"
            onChange={handleNameFilterChange}
          />
        </label>
        <label style={{ marginTop: '10px', display: 'block' }}>
          Filter:
          <select
            name="activeFilter"
            value={activeFilter}
            onChange={changeActiveFilter}
          >
            <option
              value={ActiveFilter.Active}
            >
              Active
            </option>
            <option
              value={ActiveFilter.NotActive}
            >
              Not active
            </option>
            <option
              value={ActiveFilter.All}
            >
              All
            </option>
          </select>
        </label>
        <label style={{ marginTop: '10px', display: 'block' }}>
          Sort:
          <select
            name="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option
              value={SortBy.Name}
            >
              Name
            </option>
            <option
              value={SortBy.Id}
            >
              Id
            </option>
            <option
              value={SortBy.Initial}
            >
              Initial
            </option>
          </select>
        </label>

        <button
          type="button"
          onClick={toggleReverse}
        >
          {isReversed ? 'Un-reverse' : 'Reverse'}
        </button>
      </div>

      <div>
        <h2>{count}</h2>
        <button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
        >
          ➕
        </button>
      </div>

      <GoodsList
        goods={goodsToRender}
        onAdd={addEmptyGood}
        onRemove={removeGood}
        onRename={renameGood}
        onToggle={toggleGood}
      />
    </>
  );
};
