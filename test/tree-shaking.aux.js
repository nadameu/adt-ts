import { Just, maybe, Nothing } from '../dist/esm/index';

console.log(maybe.lift2(x => y => x > y)(Nothing)(Just(40)));
