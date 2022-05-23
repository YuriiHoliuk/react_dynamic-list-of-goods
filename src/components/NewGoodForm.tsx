import {
  FC, useCallback, useState, ChangeEvent, FocusEvent, useMemo,
} from 'react';
import { useGoodsContext } from '../GoodsContext';
import { NewGood } from '../typedefs';

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

export const NewGoodForm: FC = () => {
  const [newGood, setNewGood] = useState<NewGood>(initialGood);
  const [newGoodErrors, setNewGoodErrors] = useState<NewGoodErrors>(
    initialGoodErrors,
  );
  const { addGood } = useGoodsContext();

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

  return (
    <form
      method="POST"
      name="good"
      onSubmit={(event) => {
        event.preventDefault();

        if (!formIsValid) {
          return;
        }

        addGood(newGood);
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
  );
};
