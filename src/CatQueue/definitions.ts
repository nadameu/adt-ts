import { List } from '../List/definitions';

export interface CatQueue<a> {
  left: List<a>;
  right: List<a>;
}
export const CatQueue =
  <a>(left: List<a>) =>
  (right: List<a>): CatQueue<a> => ({ left, right });
