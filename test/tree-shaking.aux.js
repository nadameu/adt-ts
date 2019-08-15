import { applyMaybe, Just, lift2, Nothing } from '../dist/esm/index';

console.log(lift2(applyMaybe)(x => y => x > y)(Nothing)(Just(40)));
