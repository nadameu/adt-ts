import { EQ, GT, LT } from './Ordering';

export const unsafeCompareImpl = (x: any) => (y: any) => (x < y ? LT : x === y ? EQ : GT);
