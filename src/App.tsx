import { ChangeEvent, Component } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { Good } from './typedefs';

enum ActiveFilter {
  All = 'all',
  Active = 'active',
  NotActive = 'notActive',
}

enum SortBy {
  Name = 'name',
  Id = 'id',
  Initial = 'initial',
}

interface State {
  goods: Good[];
  nameFilter: string;
  activeFilter: ActiveFilter;
  count: number;
  sortBy: SortBy;
  isReversed: boolean;
}

const goodsFromServer = [
  { id: 3, name: 'garlic', isActive: false },
  { id: 1, name: 'onion', isActive: false },
  { id: 2, name: 'tomato', isActive: false },
];

function filter(
  goods: Good[],
  nameFilter: string,
  activeFilter: ActiveFilter,
): Good[] {
  return goods
    .filter((currentGood) => (
      !currentGood.name || currentGood.name.includes(nameFilter)
    ))
    .filter((currentGood) => {
      switch (activeFilter) {
        case ActiveFilter.All: {
          return true;
        }

        case ActiveFilter.Active: {
          return currentGood.isActive;
        }

        case ActiveFilter.NotActive: {
          return !currentGood.isActive;
        }

        default: {
          return true;
        }
      }
    });
}

function sortByName(goods: Good[]): Good[] {
  return [...goods].sort((goodA, goodB) => (
    goodA.name.localeCompare(goodB.name)
  ));
}

function sortById(goods: Good[]): Good[] {
  return [...goods].sort((goodA, goodB) => (
    goodA.id - goodB.id
  ));
}

function sort(goods: Good[], sortBy: SortBy): Good[] {
  switch (sortBy) {
    case SortBy.Name: {
      return sortByName(goods);
    }

    case SortBy.Id: {
      return sortById(goods);
    }

    case SortBy.Initial:
    default: {
      return goods;
    }
  }
}

export class App extends Component<{}, State> {
  state: State = {
    goods: goodsFromServer,
    nameFilter: '',
    count: 0,
    activeFilter: ActiveFilter.All,
    sortBy: SortBy.Initial,
    isReversed: false,
  };

  toggleGood = (id: number): void => {
    this.setState(({ goods }) => ({
      goods: goods.map(currentGood => {
        if (currentGood.id === id) {
          return {
            ...currentGood,
            isActive: !currentGood.isActive,
          };
        }

        return currentGood;
      }),
    }));
  };

  renameGood = (id: number, updatedName: string): void => {
    this.setState(({ goods }) => ({
      goods: goods.map(currentGood => {
        if (currentGood.id === id) {
          return {
            ...currentGood,
            name: updatedName,
          };
        }

        return currentGood;
      }),
    }));
  };

  addEmptyGood = () => {
    this.setState(({ goods }) => ({
      goods: [
        ...goods,
        {
          id: goods[goods.length - 1].id + 1,
          isActive: false,
          name: '',
        },
      ],
    }));
  };

  removeGood = (id: number) => {
    this.setState(({ goods }) => ({
      goods: goods.filter(currentGood => (
        currentGood.id !== id
      )),
    }));
  };

  setNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      nameFilter: event.target.value,
    });
  };

  setActiveFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      activeFilter: event.target.value as ActiveFilter,
    });
  };

  setSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      sortBy: event.target.value as SortBy,
      isReversed: false,
    });
  };

  toggleReverse = () => {
    this.setState((prev) => ({
      isReversed: !prev.isReversed,
    }));
  };

  render() {
    const {
      goods,
      nameFilter,
      activeFilter,
      count,
      sortBy,
      isReversed,
    } = this.state;

    const filteredGoods = filter(goods, nameFilter, activeFilter);
    const sortedGoods = sort(filteredGoods, sortBy);
    const goodsToRender = isReversed
      ? sortedGoods.reverse()
      : sortedGoods;

    return (
      <>
        <div>
          <label style={{ display: 'block' }}>
            <p>Search by name:</p>
            <input
              type="text"
              onChange={this.setNameFilter}
            />
          </label>
          <label style={{ marginTop: '10px', display: 'block' }}>
            Filter:
            <select
              name="activeFilter"
              value={activeFilter}
              onChange={this.setActiveFilter}
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
              onChange={this.setSortBy}
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
            onClick={this.toggleReverse}
          >
            {isReversed ? 'Un-reverse' : 'Reverse'}
          </button>
        </div>

        <div>
          <h2>{count}</h2>
          <button
            type="button"
            onClick={() => this.setState((prev) => ({
              count: prev.count + 1,
            }))}
          >
            ➕
          </button>
        </div>

        <GoodsList
          goods={goodsToRender}
          onAdd={this.addEmptyGood}
          onRemove={this.removeGood}
          onRename={this.renameGood}
          onToggle={this.toggleGood}
        />
      </>
    );
  }
}
