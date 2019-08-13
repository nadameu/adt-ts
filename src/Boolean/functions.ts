import { Eq } from '../typeclasses/Eq';
export const eq: Eq<boolean>['eq'] = (a, b) => a === b;
