import { FC } from 'react';
import { Good } from '../typedefs';

interface Props {
  goods: Good[];
  onToggle: (id: number) => void;
  onRename: (id: number, name: string) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}

export const GoodsList: FC<Props> = (props) => {
  const {
    goods,
    onToggle,
    onRename,
    onAdd,
    onRemove,
  } = props;

  return (
    <>
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

            <button
              type="button"
              onClick={() => onToggle(good.id)}
              style={{ marginLeft: '10px' }}
            >
              Toggle
            </button>

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

      <button
        type="button"
        onClick={onAdd}
      >
        Add new good
      </button>
    </>
  );
};
