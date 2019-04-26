import { Prop1, Type1 } from '../Types';

export interface Eq<a> {
	eq: (x: a) => (y: a) => boolean;
}

export const notEq: <a>(E: Eq<a>) => Eq<a>['eq'] = ({ eq }) => x => y => !eq(x)(y);

export interface Eq1<f extends Prop1> {
	eq1: <a>(E: Eq<a>) => (fx: Type1<f, a>) => (fy: Type1<f, a>) => boolean;
}

export const notEq1: <f extends Prop1>(E1: Eq1<f>) => Eq1<f>['eq1'] = ({ eq1 }) => ({
	eq,
}) => fx => fy => !eq1({ eq })(fx)(fy);
