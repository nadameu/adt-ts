import { rollup } from 'rollup';
import * as path from 'path';

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
