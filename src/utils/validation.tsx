import { RegExps } from '../types';

const validateInput = (pattern: RegExps[], value: string): string | boolean => {
  for (let i = 0; i < pattern.length; i += 1) {
    if (!pattern[i].regex.test(value)) {
      return pattern[i].error;
    }
  }
  return true;
};

export default validateInput;
