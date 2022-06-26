import { Generic2 } from '../Generic';
import { makeFunctor } from '../typeclasses/Functor';

export type Step<a, b> = Loop<a> | Done<b>;
export interface Loop<a> {
  done: false;
  value: a;
}
export const Loop = <a>(value: a): Loop<a> => ({ done: false, value });
export interface Done<b> {
  done: true;
  value: b;
}
export const Done = <b>(value: b): Done<b> => ({ done: true, value });
export interface TStep extends Generic2 {
  type: Step<this['a'], this['b']>;
}
export const functorStep = makeFunctor<TStep>({ map: f => fx => fx.done ? Done(f(fx.value)) : fx });

export const tailRec =
  <a, b>(f: (_: a) => Step<a, b>) =>
  (z: a): b => {
    let r = f(z);
    while (!r.done) r = f(r.value);
    return r.value;
  };
