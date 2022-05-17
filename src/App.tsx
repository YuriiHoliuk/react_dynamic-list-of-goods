import {
  ChangeEvent, FC, useMemo, useState,
} from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { ActiveFilter, goodsFromServer, SortBy } from './constants';
import { Good, NewGood } from './typedefs';
import { filterGoods, sortGoods } from './utils';

let lastId = 3;

export const App: FC = () => {
  const [goods, setGoods] = useState<Good[]>(goodsFromServer);
  const [nameFilter, setNameFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(ActiveFilter.All);
  const [sortBy, setSortBy] = useState(SortBy.Initial);
  const [isReversed, setIsReversed] = useState(true);

  const goodsToRender = useMemo(() => {
    const filteredGoods = filterGoods(goods, nameFilter, activeFilter);
    const sortedGoods = sortGoods(filteredGoods, sortBy);

    return isReversed
      ? sortedGoods.reverse()
      : sortedGoods;
  }, [nameFilter, activeFilter, sortBy, isReversed, goods]);

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

  const addEmptyGood = (newGood: NewGood) => {
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
            value={nameFilter}
            onChange={handleNameFilterChange}
            name="nameFilter"
          />
        </label>
        <div>
          <button
            onClick={() => setNameFilter('')}
            type="button"
          >
            Clear name filter
          </button>
          <button
            onClick={() => setNameFilter('garlic')}
            type="button"
          >
            Find garlic
          </button>
        </div>
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

        <div>
          <button type="submit">
            Submit
          </button>
        </div>
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
