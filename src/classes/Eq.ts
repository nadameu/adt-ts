import { Prop1, Type } from '../Types';

export interface Eq<a> {
	eq: (x: a) => (y: a) => boolean;
}

export const notEq: <a>(E: Eq<a>) => Eq<a>['eq'] = ({ eq }) => x => y => !eq(x)(y);

export interface Eq1<f extends Prop1> {
	eq1: <a>(
		E: Eq<a>,
	) => (
		fx: Type<f, never, never, never, never, a>,
	) => (fy: Type<f, never, never, never, never, a>) => boolean;
}

export const notEq1: <f extends Prop1>(E0: Eq1<f>) => Eq1<f>['eq1'] = ({ eq1 }) => ({
	eq,
}) => fx => fy => !eq1({ eq })(fx)(fy);
