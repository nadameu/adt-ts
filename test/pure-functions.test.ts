import * as path from 'path';
import { rollup } from 'rollup';
import { expect, test } from 'vitest';

test('Simple', async () => {
  const bundle = await rollup({
    input: { 'src/index': path.resolve(__dirname, 'pure-functions.aux.js') },
  });
  const {
    output: [output],
  } = await bundle.generate({
    format: 'es',
  });
  expect(output.code).toMatchInlineSnapshot(`
    "
    "
  `);
});
