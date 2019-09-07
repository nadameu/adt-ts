import { Eq } from '../typeclasses';
export const eq: Eq<number>['eq'] = a => b => a === b;
