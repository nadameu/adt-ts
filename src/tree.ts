import { applicativeMaybe, Just, maybe, Maybe, monadErrorMaybe, Nothing } from './Maybe';

const x = [Just(42), Nothing as Maybe<number>]
  .map(x => maybe.traverse(applicativeMaybe)<number, boolean>(x => Just(x > 3))(x))
  .map(x => monadErrorMaybe.bind<Maybe<boolean>, boolean>(x => x)(x))
  .reduce((acc, x) => maybe.alt(acc)(x), Nothing);

console.log(x, x.isJust);
