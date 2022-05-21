import {
  FC,
} from 'react';
import { Good } from '../typedefs';

interface Props {
  goods: Good[];
  onToggle: (id: number) => void;
  onRename: (id: number, name: string) => void;
  onRemove: (id: number) => void;
}

export const GoodsList: FC<Props> = (props) => {
  const {
    goods,
    onToggle,
    onRename,
    onRemove,
  } = props;

  return (
    <ul>
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
              onRename(good.id, event.target.value)
            )}
          />

          <label>
            <input
              type="checkbox"
              checked={good.isActive}
              onChange={() => onToggle(good.id)}
              style={{ marginLeft: '10px' }}
            />
            Toggle
          </label>

          <button
            type="button"
            onClick={() => onRemove(good.id)}
            style={{ marginLeft: '10px' }}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
};
