import { Good } from './typedefs';

export enum ActiveFilter {
  All = 'all',
  Active = 'active',
  NotActive = 'notActive',
}

export enum SortBy {
  Name = 'name',
  Id = 'id',
  Initial = 'initial',
}

export const goodsFromServer: Good[] = [
  { id: 3, name: 'garlic', isActive: false },
  { id: 1, name: 'onion', isActive: false },
  { id: 2, name: 'tomato', isActive: false },
];
