import { array as A, pipe } from '../src';
export const generate = ({
  name,
  firstLetter = 'a',
  lastLetter = 'b',
  type = x => x,
  prefix = '',
}: {
  name: string;
  firstLetter?: string;
  lastLetter?: string;
  type?: (_: string) => string;
  prefix?: string;
}) => {
  const ends = A.range(-1)(19);
  const defs = ends.map(
    pipe(
      A.range(-1),
      xs => xs.map(i => `x${i}`),
      range => {
        range[0] = firstLetter;
        if (range.length > 1) range[range.length - 1] = lastLetter;
        const letters = range.join(', ');
        const pairs = Array.from(range)
          .map((a, i, as) => [a, as[i + 1]] as [string, string | undefined])
          .filter((x): x is [string, string] => x[1] !== undefined);
        const fns = pairs.map(([a, b], i) => `f${i}: (_: ${a}) => ${type(b)}`);
        const first = range[0];
        const last = range[range.length - 1];
        return fns.length === 0
          ? `(): <${prefix}${letters}>(_: ${first}) => ${type(last)};`
          : `<${prefix}${letters}>(${fns.join(', ')}): (_: ${first}) => ${type(last)};`;
      }
    )
  );
  const z = `export interface ${name} {\n${defs.map(x => `  ${x}`).join('\n')}\n}`;
  return z;
};
