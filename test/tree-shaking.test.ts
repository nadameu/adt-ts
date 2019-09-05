import { rollup } from 'rollup';
import * as path from 'path';

test('Simple', async () => {
  const bundle = await rollup({
    input: { 'src/index': path.resolve(__dirname, 'tree-shaking.aux.js') },
  });
  const {
    output: [output],
  } = await bundle.generate({
    format: 'es',
  });
  expect(output.code).toMatchInlineSnapshot(`
    "const compose = (f) => (g) => (a) => f(g(a));
    const flip = (f) => (b) => (a) => f(a)(b);

    const lift2 = ({ apply, map }) => (f) => compose(apply)(map(f));

    const Nothing = { isJust: false, isNothing: true };
    const Just = (value) => ({ isJust: true, isNothing: false, value });
    const maybe = (b) => (f) => (fa) => fa.isNothing ? b : f(fa.value);

    const applyDefault = (({ bind, map }) => flip((fa) => bind(f => map(f)(fa))));

    const liftM1 = (({ bind, pure, }) => (f) => bind(compose(pure)(f)));

    const bind = maybe(Nothing);
    const pure = Just;
    const map = liftM1({ bind, pure });
    const apply = applyDefault({ bind, map });

    const applyMaybe = { apply, map };

    console.log(lift2(applyMaybe)(x => y => x > y)(Nothing)(Just(40)));
    "
  `);
});
