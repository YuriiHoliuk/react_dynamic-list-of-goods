export interface Good {
  id: number;
  name: string;
  isActive: boolean;
}

export type NewGood = Omit<Good, 'id'>;
