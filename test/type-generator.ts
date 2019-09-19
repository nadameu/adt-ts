import { range } from '../src/Array/functions/original';

const LENGTH = 20;

const rangeToPairs = (range: string[]): [string, string][] =>
  range.map((a, i) => [range[i - 1], a] as [string, string]).slice(1);

export const generate = ({
  name,
  firstLetter = 'a',
  lastLetter = 'b',
  type = x => x,
  lettersPrefix = [],
  functionPrefix = '',
  outputIsFunction = true,
}: {
  name: string;
  firstLetter?: string;
  lastLetter?: string;
  type?: (_: string) => string;
  lettersPrefix?: string[];
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
    if (outputIsFunction) {
      if (range.length === 1) {
        const letter = range[0];
        const params = lettersPrefix.concat(range);
        return `${functionPrefix}(): <${params.join(', ')}>(_: ${letter}) => ${type(letter)};`;
      }
      const params = lettersPrefix.concat(range).join(', ');
      const fns = rangeToPairs(range).map(([a, b]) => `(_: ${a}) => ${type(b)}`);
      return `${functionPrefix}<${params}>(${fns
        .map((f, i) => `f${i}: ${f}`)
        .join(', ')}): (_: ${firstLetter}) => ${type(lastLetter)};`;
    } else {
      if (range.length === 1) {
        const letter = range[0];
        const params = lettersPrefix.length > 0 ? `<${lettersPrefix.join(', ')}>` : ``;
        return `${functionPrefix}${params}(): ${type(letter)};`;
      }
      const params = lettersPrefix.concat(range.slice(1)).join(', ');
      const fns = rangeToPairs(range).map(([a, b]) => `(_: ${a}) => ${type(b)}`);
      return `${functionPrefix}<${params}>(${fns.map((f, i) => `f${i}: ${f}`).join(', ')}): ${type(
        lastLetter
      )};`;
    }
  });
  return `export interface ${name} {\n${defs.map(x => `  ${x}`).join('\n')}\n}`;
};
