import { Eq } from '../typeclasses/Eq';
export const eq: Eq<string>['eq'] = (a, b) => a === b;
