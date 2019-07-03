import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';

declare const CharSymbol: unique symbol;
export type Char = string & { [CharSymbol]: 'Char' };

export const eq: (x: Char) => (y: Char) => boolean = refEq;
export const eqChar: Eq<Char> = { eq };

export const compare: (x: Char) => (y: Char) => Ordering = unsafeCompareImpl;
export const ordChar: Ord<Char> = { eq, compare };

export const top = String.fromCharCode(65535) as Char;
export const bottom = String.fromCharCode(0) as Char;
export const boundedChar: Bounded<Char> = { eq, compare, top, bottom };

export const show = (x: Char): string => {
	const code = x.charCodeAt(0);
	if (code < 0x20 || code === 0x7f) {
		switch (x) {
			case '\x07':
				return "'\\a'";
			case '\b':
				return "'\\b'";
			case '\f':
				return "'\\f'";
			case '\n':
				return "'\\n'";
			case '\r':
				return "'\\r'";
			case '\t':
				return "'\\t'";
			case '\v':
				return "'\\v'";
		}
		return `'\\${code.toString(10)}'`;
	}
	return x === "'" || x === '\\' ? `'\\${x}'` : `'${x}'`;
};
export const showChar: Show<Char> = { show };
