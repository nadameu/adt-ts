import { applyMaybe, Nothing } from '../dist/esm/index';

console.log(applyMaybe.map(x => x > 3)(Nothing));
