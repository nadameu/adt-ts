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
      "const lift2 = ({ apply, map }) => (f) => (fa) => apply(map(f)(fa));

    function Maybe() { }
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

    const applyDefault = ({ bind, map, }) => (ff) => (fa) => bind(f => map(f)(fa))(ff);

    const liftM1 = ({ bind, pure, }) => (f) => bind(x => pure(f(x)));

    const maybe = (b) => (f) => (fa) => fa.isNothing ? b : f(fa.value);
    const bind = maybe(Nothing);
    const pure = Just;
    const map = liftM1({ bind, pure });
    const apply = applyDefault({ bind, map });

    const applyMaybe = { apply, map };

    console.log(lift2(applyMaybe)(x => y => x > y)(Nothing)(Just(40)));
    ",
    ]
  `);
});
