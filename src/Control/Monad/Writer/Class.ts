import { Generic1, Type } from '../../../Generic';
import { Monad } from '../../Monad';

export interface MonadTell<w, m extends Generic1> extends Monad<m> {
	tell: (_: w) => Type<m, void>;
}

export interface MonadWriter<w, m extends Generic1> extends MonadTell<w, m> {
	listen: <a>(ma: Type<m, a>) => Type<m, [a, w]>;
	pass: <a>(m: Type<m, [a, (_: w) => w]>) => Type<m, a>;
}

export const listens = <w, m extends Generic1>(writer: MonadWriter<w, m>) => <b>(
	f: (_: w) => b,
) => <a>(m: Type<m, a>): Type<m, [a, b]> =>
	writer.bind(writer.listen(m))(([a, w]) => writer.pure([a, f(w)]));

export const censor = <w, m extends Generic1>(writer: MonadWriter<w, m>) => (f: (_: w) => w) => <a>(
	m: Type<m, a>,
): Type<m, a> => writer.pass(writer.bind(m)(a => writer.pure([a, f])));
