import { FC, ChangeEvent } from 'react';
import { ActiveFilter, SortBy } from '../constants';

interface Props {
  nameFilter: string;
  activeFilter: ActiveFilter;
  sortBy: SortBy;
  isReversed: boolean;
  onNameFilterChange(value: string): void;
  onActiveFilterChange(value: ActiveFilter): void;
  onSortByChange(value: SortBy): void;
  onReverseToggle(): void;
}

export const GoodControls: FC<Props> = (props) => {
  const {
    nameFilter,
    activeFilter,
    sortBy,
    isReversed,
    onNameFilterChange,
    onActiveFilterChange,
    onSortByChange,
    onReverseToggle,
  } = props;

  const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    onNameFilterChange(event.target.value);
  };

  const changeActiveFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    onActiveFilterChange(event.target.value as ActiveFilter);
  };

  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortByChange(event.target.value as SortBy);
  };

  return (
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
          onClick={() => onNameFilterChange('')}
          type="button"
        >
          Clear name filter
        </button>
        <button
          onClick={() => onNameFilterChange('garlic')}
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
        onClick={onReverseToggle}
      >
        {isReversed ? 'Un-reverse' : 'Reverse'}
      </button>

      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};
