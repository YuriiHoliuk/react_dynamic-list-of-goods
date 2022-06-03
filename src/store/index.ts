/* eslint-disable no-console */
import {
  combineReducers,
  legacy_createStore as createStore,
  Reducer,
  applyMiddleware,
  Middleware,
  Dispatch,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { getAll } from '../api/goods';
import { Good } from '../typedefs';

export enum ActionTypes {
  LoadGoods = 'Goods::Load',
  GoodsLoaded = 'Goods::Loaded',
  GoodsErrorReceived = 'Goods::Error',
}

interface LoadGoodsAction {
  type: ActionTypes.LoadGoods;
}

interface GoodsLoadedAction {
  type: ActionTypes.GoodsLoaded;
  payload: Good[];
}

interface GoodsErrorReceivedAction {
  type: ActionTypes.GoodsErrorReceived;
  payload: string;
}

export const startLoadGoods = (): LoadGoodsAction => ({
  type: ActionTypes.LoadGoods,
});

export type Action = LoadGoodsAction
| GoodsLoadedAction
| GoodsErrorReceivedAction;

export interface State {
  goods: Good[];
  error: null | string;
  isLoading: boolean;
}

export const setGoods = (goods: Good[]): GoodsLoadedAction => ({
  type: ActionTypes.GoodsLoaded,
  payload: goods,
});

export const loadGoods = (): ThunkAction<
Promise<void>,
State,
undefined,
Action
> => async (dispatch) => {
  dispatch({
    type: ActionTypes.LoadGoods,
  });

  try {
    const receivedGoods = await getAll();

    const mappedGoods = receivedGoods.map<Good>((goodFromServer) => ({
      id: goodFromServer.id,
      name: goodFromServer.name,
      isActive: false,
    }));

    dispatch({
      type: ActionTypes.GoodsLoaded,
      payload: mappedGoods,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GoodsErrorReceived,
      payload: (error as Error)?.message || '',
    });
  }
};

const isLoadingReducer: Reducer<boolean, Action> = (
  state = false,
  action,
) => {
  switch (action.type) {
    case ActionTypes.LoadGoods: {
      return true;
    }

    case ActionTypes.GoodsLoaded: {
      return false;
    }

    case ActionTypes.GoodsErrorReceived: {
      return false;
    }

    default: {
      return state;
    }
  }
};

const errorReducer: Reducer<string | null, Action> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case ActionTypes.GoodsLoaded: {
      return null;
    }

    case ActionTypes.GoodsErrorReceived: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

const goodsReducer: Reducer<Good[], Action> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case ActionTypes.GoodsLoaded: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

const reducer: Reducer<State, Action> = combineReducers({
  goods: goodsReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});

const loggerMiddleware: Middleware<
{},
State,
Dispatch<Action>
> = (store) => (next) => (action) => {
  console.log('DISPATCH: ', action.type);
  console.log('PREV STATE: ', store.getState());

  next(action);

  console.log('NEXT STATE: ', store.getState());
};

export const store = createStore<State, Action, {}, {}>(
  reducer,
  applyMiddleware(loggerMiddleware, thunk),
);
