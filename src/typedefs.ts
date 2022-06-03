export interface Good {
  id: number;
  name: string;
  isActive: boolean;
}

export interface GoodFromServer {
  id: number;
  name: string;
  color: string;
}

export type NewGood = Omit<Good, 'id'>;
