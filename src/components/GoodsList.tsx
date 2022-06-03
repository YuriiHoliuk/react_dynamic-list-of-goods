import {
  FC,
} from 'react';
import { useGoodsContext } from '../GoodsContext';
import { Good } from '../typedefs';

interface Props {
  goods: Good[];
}

export const GoodsList: FC<Props> = (props) => {
  const {
    goods,
  } = props;

  const goodsContext = useGoodsContext();

  if (goodsContext.isLoading) {
    return (
      <h1 style={{ margin: '0 auto' }}>Loading...</h1>
    );
  }

  if (goodsContext.error) {
    return (
      <h1 style={{ margin: '0 auto', color: 'tomato' }}>
        {goodsContext.error}
      </h1>
    );
  }

  return (
    <ul style={{ order: -1 }}>
      {goods.map((good) => (
        <li
          key={good.id}
          className={good.isActive ? 'active' : ''}
          style={{ marginBottom: '15px' }}
        >
          <span>{good.id}</span>
          <input
            type="text"
            value={good.name}
            onChange={(event) => (
              goodsContext.renameGood(good.id, event.target.value)
            )}
          />

          <label>
            <input
              type="checkbox"
              checked={good.isActive}
              onChange={() => goodsContext.toggleGood(good.id)}
              style={{ marginLeft: '10px' }}
            />
            Toggle
          </label>

          <button
            type="button"
            onClick={() => goodsContext.removeGood(good.id)}
            style={{ marginLeft: '10px' }}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
};
