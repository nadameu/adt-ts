import { Eq } from '../../typeclasses/Eq';

export const makeEqArray = <a>(eq: Eq<a>): Eq<Array<a>> => ({
  NotGenericType: (undefined as unknown) as Array<a>,
  eq: (xs, ys) => xs.length === ys.length && xs.every((_, i) => eq.eq(xs[i], ys[i])),
});
