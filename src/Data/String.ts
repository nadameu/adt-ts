import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';

export const eq: (x: string) => (y: string) => boolean = refEq;
export const eqString: Eq<string> = { eq };

export const compare: (x: string) => (y: string) => Ordering = unsafeCompareImpl;
export const ordString: Ord<string> = { eq, compare };

export const show = (x: string): string => {
	const l = x.length;
	const t = x.replace(
		/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
		(c, i) => {
			switch (c) {
				case '"':
				case '\\':
					return `\\${c}`;
				case '\x07':
					return '\\a';
				case '\b':
					return '\\b';
				case '\f':
					return '\\f';
				case '\n':
					return '\\n';
				case '\r':
					return '\\r';
				case '\t':
					return '\\t';
				case '\v':
					return '\\v';
			}
			const k = i + 1;
			const empty = k < l && x[k] >= '0' && x[k] <= '9' ? '\\&' : '';
			return `\\${c.charCodeAt(0).toString(10)}${empty}`;
		},
	);
	return `"${t}"`;
};
export const showString: Show<string> = { show };
