import {
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import { GoodControls } from './GoodsControls';
import { GoodsList } from './GoodsList';
import { ActiveFilter, SortBy } from '../constants';
import { Good } from '../typedefs';
import { filterGoods, sortGoods } from '../utils';

interface Props {
  goods: Good[];
}

export const Goods: FC<Props> = memo((props) => {
  const {
    goods,
  } = props;

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

  const handleSortByChange = useCallback((value: SortBy) => {
    setSortBy(value as SortBy);
    setIsReversed(false);
  }, []);

  const toggleReverse = useCallback(() => {
    setIsReversed((prev) => !prev);
  }, []);

  return (
    <>
      <GoodControls
        nameFilter={nameFilter}
        activeFilter={activeFilter}
        sortBy={sortBy}
        isReversed={isReversed}
        onNameFilterChange={setNameFilter}
        onActiveFilterChange={setActiveFilter}
        onSortByChange={handleSortByChange}
        onReverseToggle={toggleReverse}
      />

      <GoodsList
        goods={goodsToRender}
      />
    </>
  );
});
