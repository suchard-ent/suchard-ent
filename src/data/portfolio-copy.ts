import type {Lang} from './credits';
import {getBiography} from './biography';
import {getUiCopy} from './ui-copy';

export const getText = (lang:Lang) => ({
  ...getUiCopy(lang),
  ...getBiography(lang)
});
