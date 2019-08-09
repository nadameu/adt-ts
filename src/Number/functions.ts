import { Eq } from '../typeclasses/Eq';
export const eq: Eq<number>['eq'] = (a, b) => a === b;
