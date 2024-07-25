import { nanoid } from 'nanoid';

export const generateRandomString = (length: number) => {
  return nanoid(length);
  // return 'random_string';
};
