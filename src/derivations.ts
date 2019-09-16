export { lift2, lift3, lift4, lift5 } from './typeclasses/Apply';
export { composeK, join, pipeK, wrapBind } from './typeclasses/Bind';
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
export { composeFlipped } from './typeclasses/Semigroupoid';
