import * as d from '../../derivations';
import { Apply_1, BindOnly_1, Functor_1, PureOnly_1 } from '../../typeclasses';
import { TFuture } from '../internal';
import { apply, bind, map, pure } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TFuture>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TFuture>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TFuture>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TFuture>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TFuture>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TFuture>);
export const join = d.join({ bind } as BindOnly_1<TFuture>);

export const flap = d.flap({ map } as Functor_1<TFuture>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TFuture>);
export const voidRight = d.voidRight({ map } as Functor_1<TFuture>);
export const $$void = d.$$void({ map } as Functor_1<TFuture>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TFuture> & PureOnly_1<TFuture>);
export const pipeKValue = d.pipeKValue({ bind, pure } as BindOnly_1<TFuture> & PureOnly_1<TFuture>);
