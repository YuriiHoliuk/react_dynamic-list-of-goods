import { GoodFromServer } from '../typedefs';

// eslint-disable-next-line
const API_URL = `https://mate-academy.github.io/react_dynamic-list-of-goods/goods.json`;

export async function getAll(): Promise<GoodFromServer[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      switch (response.status) {
        case 404: {
          throw new Error('Cannot found goods');
        }

        default: {
          throw new Error('Server respond with error');
        }
      }
    }

    const goods = await response.json();

    return goods;
  } catch (error) {
    if (
      error
      && typeof error === 'object'
      && (error as Error).message === 'Failed to fetch'
    ) {
      const myError = new Error(`
      Cannot connect the server. Check server status here https://githubstatus.com.
      Or check your internet connection.
      `);

      throw myError;
    } else {
      throw error;
    }
  }
}

export const get5First = () => {
};

export const getRedGoods = () => {};
