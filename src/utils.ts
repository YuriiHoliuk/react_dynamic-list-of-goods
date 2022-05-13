import { ActiveFilter, SortBy } from './constants';
import { Good } from './typedefs';

export function filterGoods(
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

export function sortGoods(goods: Good[], sortBy: SortBy): Good[] {
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
