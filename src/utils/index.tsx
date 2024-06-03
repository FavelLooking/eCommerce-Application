import { RegExps } from '../types';
import { comicsSet, mangaSet } from './constants';

export const validateInput = (
  pattern: RegExps[],
  value: string
): string | boolean => {
  for (let i = 0; i < pattern.length; i += 1) {
    if (!pattern[i].regex.test(value)) {
      return pattern[i].error;
    }
  }
  return true;
};

export const isValidPath = (currentPath: string): boolean => {
  const subcategory = new Map();
  subcategory.set('comics', comicsSet);
  subcategory.set('manga', mangaSet);
  const path = currentPath.split('/');
  if (path[2] && !subcategory.has(path[2])) return false;
  if (path[3] && !(subcategory.get(path[2]) as Array<string>).includes(path[3]))
    return false;
  return true;
};
