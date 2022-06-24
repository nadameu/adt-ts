import { Applicative_1, Apply_1, Bind_1, Functor_1 } from '../../typeclasses';
import { Alt_1 } from '../../typeclasses/Alt';
import { Plus_1 } from '../../typeclasses/Plus';
import { Future, Handler } from '../definitions';
import { TFuture } from '../internal';

export const run =
  <a>(handler: Handler<a>) =>
  (fa: Future<a>) => {
    let done = false;
    fa(value => {
      if (done) return;
      done = true;
      handler(value);
    });
  };

export const map: Functor_1<TFuture>['map'] =
  <a, b>(f: (_: a) => b) =>
  (fa: Future<a>): Future<b> =>
  k =>
    run<a>(x => k(f(x)))(fa);

export const apply =
  <a, b>(ff: Future<(_: a) => b>) =>
  (fa: Future<a>): Future<b> =>
  k => {
    let result: { f: { value: (_: a) => b } | null; a: { value: a } | null } = { f: null, a: null };
    const onResolve: {
      (prop: 'f'): (value: (_: a) => b) => void;
      (prop: 'a'): (value: a) => void;
    } = (prop: 'f' | 'a') => (value: any) => {
      if (result[prop] === null) {
        result[prop] = { value };
        if (result.f && result.a) {
          k(result.f.value(result.a.value));
        }
      }
    };
    run(onResolve('f'))(ff);
    run(onResolve('a'))(fa);
  };

export const pure: Applicative_1<TFuture>['pure'] = value => k => {
  Promise.resolve(value)
    .then(k)
    .catch(err =>
      setTimeout(() => {
        throw err;
      })
    );
};

export const bind: Bind_1<TFuture>['bind'] = f => fx => k => run<any>(x => run(k)(f(x)))(fx);

export const alt: Alt_1<TFuture>['alt'] =
  <a>(fx: Future<a>) =>
  (fy: Future<a>): Future<a> =>
  k => {
    let done = false;
    const resolve = (z: a) => {
      if (done) return;
      done = true;
      k(z);
    };
    run(resolve)(fx);
    run(resolve)(fy);
  };

export const empty: Plus_1<TFuture>['empty'] = () => _ => {};
