import { applicativeMaybe, Just, maybe, Maybe, monadErrorMaybe, Nothing } from './Maybe';

const x = [Just(42), Nothing as Maybe<number>]
  .map(maybe.traverse(applicativeMaybe)(x => Just(x > 3)))
  .map(monadErrorMaybe.bind(x => x))
  .reduce((acc, x) => maybe.alt(acc, x), Nothing);

console.log(x);
