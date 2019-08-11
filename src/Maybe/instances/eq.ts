import { Eq } from '../../typeclasses/Eq';
import { Maybe } from '../definitions';

export const makeEqMaybe = <a>(eq: Eq<a>): Eq<Maybe<a>> => ({
  NotGenericType: (undefined as unknown) as Maybe<a>,
  eq: (fx, fy) => (fx.isNothing ? fy.isNothing : fy.isNothing ? false : eq.eq(fx.value, fy.value)),
});
