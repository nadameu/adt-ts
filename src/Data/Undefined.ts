import { Bind, Discard } from '../Control/Bind';
import { Generic1, Type } from '../Generic';
import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { Ord } from './Ord';
import { EQ, Ordering } from './Ordering';
import { Show } from './Show';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: undefined) => (y: undefined): boolean => true;
export const eqUndefined: Eq<undefined> = { eq };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const compare = (x: undefined) => (y: undefined): Ordering => EQ;
export const ordUndefined: Ord<undefined> = { ...eqUndefined, compare };

export const top = undefined;
export const bottom = undefined;
export const boundedUndefined: Bounded<undefined> = { ...ordUndefined, top, bottom };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const show = (x: undefined): string => 'undefined';
export const showUndefined: Show<undefined> = { show };

const discard: <f extends Generic1>(
	bind: Bind<f>,
) => (fa: Type<f, undefined>) => <b>(f: (_: undefined) => Type<f, b>) => Type<f, b> = bind =>
	bind.bind;
export const discardUndefined: Discard<undefined> = {
	discard,
};
