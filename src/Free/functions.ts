import { Generic1, Type1 } from '../Generic';
import { Applicative_1, Functor_1 } from '../typeclasses';
import { Free, Join, Pure } from './definitions';

export const makeLiftF =
  <f extends Generic1>(F: Functor_1<f>) =>
  <a>(fa: Type1<f, a>): Free<f, a> =>
    Join(F.map(Pure)(fa));

export const wrap: <f extends Generic1, a>(_: Type1<f, Free<f, a>>) => Free<f, a> = Join;

export const makeSuspendF =
  <f extends Generic1>(A: Applicative_1<f>) =>
  <a>(fa: Free<f, a>): Free<f, a> =>
    wrap(A.pure(fa));
