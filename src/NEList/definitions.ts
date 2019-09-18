import { Cons, List } from '../List/definitions';

export interface NEList<a> extends Cons<a> {}
export const NEList: <a>(head: a) => (tail: List<a>) => NEList<a> = Cons;
