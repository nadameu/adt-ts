import * as altEither from './instances/alt';
import * as applicativeEither from './instances/applicative';
import * as applyEither from './instances/apply';
import * as bindEither from './instances/bind';
import * as foldableEither from './instances/foldable';
import * as functorEither from './instances/functor';
import * as monadEither from './instances/monad';
import * as monadErrorEither from './instances/monadError';
import * as monadThrowEither from './instances/monadThrow';
import * as traversableEither from './instances/traversable';

export { makeEqEither } from './instances/eq';
export {
  altEither,
  applicativeEither,
  applyEither,
  bindEither,
  foldableEither,
  functorEither,
  monadEither,
  monadErrorEither,
  monadThrowEither,
  traversableEither,
};
