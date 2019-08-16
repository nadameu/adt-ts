import { rollup } from 'rollup';
import * as path from 'path';

test('Simple', async () => {
  const bundle = await rollup({
    input: { 'src/index': path.resolve(__dirname, 'tree-shaking.aux.js') },
  });
  const { output } = await bundle.generate({
    format: 'esm',
  });
  expect(output.map(x => x.code)).toMatchInlineSnapshot(`
    Array [
      "function Maybe() { }
    const make = (isNothing) => {
        const proto = Object.create(Maybe.prototype);
        proto.isJust = !isNothing;
        proto.isNothing = isNothing;
        if (isNothing)
            return Object.create(proto);
        return function Just(value) {
            const just = Object.create(proto);
            just.value = value;
            return just;
        };
    };
    const Nothing = /*#__PURE__*/ make(true);
    const Just = /*#__PURE__*/ make(false);

    const liftM1 = ({ bind, pure, }) => (f) => bind(x => pure(f(x)));

    const maybe = (b) => (f) => (fa) => fa.isNothing ? b : f(fa.value);
    const bind = maybe(Nothing);
    const pure = Just;
    const map = liftM1({ bind, pure });

    console.log(map(x => x > 3)(Nothing));
    ",
    ]
  `);
});
