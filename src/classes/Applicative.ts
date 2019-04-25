import { Prop1, Type } from '../Types';
import { Apply } from './Apply';

export interface Applicative<f extends Prop1> extends Apply<f> {
	pure: <a, y = never, x = never, w = never, v = never>(value: a) => Type<f, v, w, x, y, a>;
}

export const liftA1: <f extends Prop1>(
	A: Pick<Applicative<f>, 'apply' | 'pure'>,
) => Applicative<f>['map'] = ({ apply, pure }) => f => apply(pure(f));

export const when: <f extends Prop1>(
	A: Pick<Applicative<f>, 'pure'>,
) => (p: boolean) => <y, x, w, v>(fa: Type<f, v, w, x, y, void>) => Type<f, v, w, x, y, void> = ({
	pure,
}) => p => fa => (p ? fa : pure(undefined));

export const unless: <f extends Prop1>(
	A: Pick<Applicative<f>, 'pure'>,
) => (p: boolean) => <y, x, w, v>(fa: Type<f, v, w, x, y, void>) => Type<f, v, w, x, y, void> = ({
	pure,
}) => p => fa => (p ? pure(undefined) : fa);
