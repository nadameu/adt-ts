import {
  Alternative_1,
  Alt_1,
  Applicative_1,
  Apply_1,
  Bind_1,
  Functor_1,
  Monad_1,
  Plus_1,
} from '../typeclasses';
import { alt, apply, bind, empty, map, pure } from './functions/original';
import { TFuture } from './internal';

export const functorFuture = { map } as Functor_1<TFuture>;
export const applyFuture = { apply, map } as Apply_1<TFuture>;
export const applicativeFuture = { apply, map, pure } as Applicative_1<TFuture>;
export const bindFuture = { apply, bind, map } as Bind_1<TFuture>;
export const monadFuture = { apply, bind, map, pure } as Monad_1<TFuture>;

export const altFuture = { alt, map } as Alt_1<TFuture>;
export const plusFuture = { alt, empty, map } as Plus_1<TFuture>;
export const alternativeFuture = { alt, apply, empty, map, pure } as Alternative_1<TFuture>;
