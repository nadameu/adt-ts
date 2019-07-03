export const showIntImpl = n => n.toString();

export const showNumberImpl = n => {
	const str = n.toString();
	return isNaN(str + '.0') ? str : str + '.0';
};

export const showCharImpl = c => {
	const code = c.charCodeAt(0);
	if (code < 0x20 || code === 0x7f) {
		switch (c) {
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
		return "'\\" + code.toString(10) + "'";
	}
	return c === "'" || c === '\\' ? "'\\" + c + "'" : "'" + c + "'";
};

export const showStringImpl = s => {
	const l = s.length;
	const t = s.replace(
		/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
		(c, i) => {
			switch (c) {
				case '"':
				case '\\':
					return '\\' + c;
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
			const empty = k < l && s[k] >= '0' && s[k] <= '9' ? '\\&' : '';
			return '\\' + c.charCodeAt(0).toString(10) + empty;
		},
	);
	return `"${t}"`;
};

export const showArrayImpl = f => xs => `[${xs.map(f).join(',')}]`;
