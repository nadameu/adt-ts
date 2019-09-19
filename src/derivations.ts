export { lift2, lift3, lift4, lift5 } from './typeclasses/Apply';
export { composeKleisli, composeKleisliFlipped, join } from './typeclasses/Bind';
export { cleared } from './typeclasses/Filterable';
export {
  all,
  and,
  any,
  fold,
  intercalate,
  length,
  maximumBy,
  minimumBy,
  oneOf,
  oneOfMap,
  or,
  product,
  sum,
  surround,
  surroundMap,
} from './typeclasses/Foldable';
export { $$void, flap, voidLeft, voidRight } from './typeclasses/Functor';
export { pipeK } from './typeclasses/Monad/pipeK';
export { composeFlipped } from './typeclasses/Semigroupoid';
export { wilted, withered } from './typeclasses/Witherable';
