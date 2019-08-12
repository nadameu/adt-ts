import { lift2 as lift2Default } from '../../typeclasses/Apply';
import { join as joinDefault } from '../../typeclasses/Bind';
import { fold as foldDefault } from '../../typeclasses/Foldable';
import { mapTo as mapToDefault } from '../../typeclasses/Functor';
import { applyMaybe, bindMaybe, foldableMaybe, functorMaybe } from '../instances';

export const mapTo = mapToDefault(functorMaybe);
export const fold = foldDefault(foldableMaybe);
export const lift2 = lift2Default(applyMaybe);
export const join = joinDefault(bindMaybe);
