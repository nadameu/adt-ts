import { Eq } from '../typeclasses';
export const eq: Eq<boolean>['eq'] = a => b => a === b;
