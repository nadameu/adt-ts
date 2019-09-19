import { range } from '../src/Array/functions/original';

const LENGTH = 20;

const fnType = (a: string, b: string): string => {
  return `(_: ${a}) => ${b}`;
};

export const generate = ({
  name,
  firstLetter = 'a',
  lastLetter = 'b',
  type = x => x,
  lettersPrefix = '',
  functionPrefix = '',
  outputIsFunction = true,
}: {
  name: string;
  firstLetter?: string;
  lastLetter?: string;
  type?: (_: string) => string;
  lettersPrefix?: string;
  functionPrefix?: string;
  outputIsFunction?: boolean;
}) => {
  const START = -1;
  const END = LENGTH - 1;
  const ranges = range(START)(END).map(end => {
    const r = range(START)(end).map(i => `x${i}`);
    r[r.length - 1] = lastLetter;
    r[0] = firstLetter;
    return r;
  });
  const defs = ranges.map(range => {
    const pairs = range.map((a, i) => [range[i - 1], a] as [string, string]).slice(1);
    const fns = pairs.map(([a, b], i) => ({
      name: `f${i}`,
      type: fnType(a, type(b)),
    }));
    const first = range[0];
    const last = range[range.length - 1];
    const params =
      first === last ? `` : `<${lettersPrefix}${range.slice(outputIsFunction ? 0 : 1).join(', ')}>`;
    const outputPrefix = outputIsFunction && first === last ? `<${lettersPrefix}${first}>` : ``;
    const output = outputIsFunction
      ? `${outputPrefix}${fnType(first, type(last))}`
      : `${type(last)}`;
    return `${params}(${fns.map(({ name, type }) => `${name}: ${type}`).join(', ')}): ${output};`;
  });
  return `export interface ${name} {\n${defs.map(x => `  ${functionPrefix}${x}`).join('\n')}\n}`;
};
