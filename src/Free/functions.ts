import { Generic1, Type1 } from '../Generic';
import { Done, Loop } from '../helpers';
import { Applicative_1, Functor_1, MonadRec_1 } from '../typeclasses';
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

export const foldFree =
  <m extends Generic1>(M: MonadRec_1<m>) =>
  <f extends Generic1>(
    f: <x>(_: Type1<f, x>) => Type1<m, x>
  ): (<a>(fa: Free<f, a>) => Type1<m, a>) =>
    M.tailRecM(fa => {
      if (fa.isPure) return M.map(Done)(M.pure(fa.value));
      return M.map(Loop)(f(fa.inner));
    });
