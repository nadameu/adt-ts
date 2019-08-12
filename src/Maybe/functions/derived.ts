import { fold as foldDefault, foldMapDefaultL } from '../../typeclasses/Foldable';
import { foldableMaybe, functorMaybe } from '../instances';
import { mapTo as mapToDefault } from '../../typeclasses/Functor';

export const mapTo = mapToDefault(functorMaybe);
export const fold = foldDefault(foldableMaybe);
