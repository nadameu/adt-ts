import { applyMaybe, Just, derivations, Nothing } from '../dist/esm/index';

console.log(derivations.lift2(applyMaybe)(x => y => x > y)(Nothing)(Just(40)));
