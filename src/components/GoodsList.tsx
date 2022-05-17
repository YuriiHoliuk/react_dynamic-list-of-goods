import {
  FC, useCallback, useState, ChangeEvent, FocusEvent, useMemo,
} from 'react';
import { Good, NewGood } from '../typedefs';

interface Props {
  goods: Good[];
  onToggle: (id: number) => void;
  onRename: (id: number, name: string) => void;
  onAdd: (newGood: NewGood) => void;
  onRemove: (id: number) => void;
}

type NewGoodErrors = {
  [key in keyof NewGood]: null | string;
};

const initialGood: NewGood = {
  name: '',
  isActive: false,
};

const initialGoodErrors: NewGoodErrors = {
  name: null,
  isActive: null,
};

export const GoodsList: FC<Props> = (props) => {
  const [newGood, setNewGood] = useState<NewGood>(initialGood);
  const [newGoodErrors, setNewGoodErrors] = useState<NewGoodErrors>(
    initialGoodErrors,
  );

  const formIsValid = useMemo(() => {
    return Object.values(newGoodErrors)
      .every((error) => error === null);
  }, [newGoodErrors]);

  const handleNewGoodChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;

      const name = target.name as keyof NewGood;
      const value = target.type === 'checkbox'
        ? target.checked
        : target.value;

      setNewGood((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleNewGoodBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (name !== 'name') {
        return;
      }

      if (value.length === 0) {
        setNewGoodErrors((prev) => ({
          ...prev,
          name: 'Name is required',
        }));
      } else {
        setNewGoodErrors((prev) => ({
          ...prev,
          name: null,
        }));
      }
    },
    [],
  );

  const {
    goods,
    onToggle,
    onRename,
    onAdd,
    onRemove,
  } = props;

  return (
    <>
      <form
        method="POST"
        name="good"
        onSubmit={(event) => {
          event.preventDefault();

          if (!formIsValid) {
            return;
          }

          onAdd(newGood);
          setNewGood(initialGood);
        }}
      >
        <label>
          <p>Name: </p>
          <input
            type="text"
            name="name"
            value={newGood.name}
            onChange={handleNewGoodChange}
            onBlur={handleNewGoodBlur}
          />
        </label>
        <p>
          {newGoodErrors.name}
        </p>
        <label>
          <p>Is active: </p>
          <input
            type="checkbox"
            name="isActive"
            checked={newGood.isActive}
            onChange={handleNewGoodChange}
            onBlur={handleNewGoodBlur}
          />
        </label>
        <p>
          {newGoodErrors.isActive}
        </p>
        <div>
          <button
            type="submit"
            disabled={!formIsValid}
          >
            Add new good
          </button>
        </div>
      </form>

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
    </>
  );
};
