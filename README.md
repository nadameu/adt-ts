# pure-ts - Translating PureScript to TypeScript

## Type classes

In PureScript:

```purescript
class Functor f where
  map :: forall a b. (a -> b) -> f a -> f b

instance functorArray :: Functor Array where
  map = arrayMap
```

In TypeScript:

```typescript
import { TypeDesc, Desc } from 'pure-ts/Type';

export interface Functor<T extends TypeDesc> {
  map: <A, B>(_: (_: A) => B)
    => <_0, _1, _2, _3>(_: Type<T, [A, _0, _1, _2, _3]>)
    => Type<T, [B, _0, _1, _2, _3]>;
}

export interface Dict<VarDescs extends TypeDesc[] = never, Vars extends any[] = never> {
  Array: Vars[0][];
}
export type Type<T extends TypeDesc, Vars extends any[]> = {
  result: T['URI'] extends keyof Dict ? Dict<T['VarDescs'], Vars>[T['URI']] : never
}['result'];

export const functorArray: Functor<Desc<'Array'>> = {
  map: f => xs => xs.map(x => f(x)),
};
const mapArray = functorArray.map; // <A, B>(_: (_: A) => B) => <_0, _1, _2, _3>(_: A[]) => B[]
```

### Type description

```typescript
import { TypeDesc, Desc } from 'pure-ts/Type';
```

`TypeDesc` is a description of a concrete TypeScript type:

```typescript
export interface TypeDesc {
  URI: string;
  VarDescs: TypeDesc[];
}
```

- `URI` is a string that uniquely identifies the type.
- `VarDescs` is an array of the descriptions of the type variables.

#### URI

The URI of native JavaScript types should be the same string returned by
`Object.prototype.toString.call(...)` (minus the `[object ` prefix and `]` suffix):

```javascript
const array = [];
const arrayURI = Object.prototype.toString.call(array).slice(8, -1);
console.log(arrayURI); // 'Array'
```

For user-defined types, it should follow the [sanctuary-js](https://github.com/sanctuary-js/sanctuary-type-identifiers)
convention: `'<namespace>/<name>[@<version>]'` (_e.g._ `'@my-scope/my-package/MyFunctor'` or `'my-package/MyFunctor@3'`).

#### Type variables

The `VarDescs` parameter should only describe *concrete* type variables, _i.e._:

For a function like `<A>(xs: Array<A>): number`, the type description of `xs` would
be `{ URI: 'Array'; VarDescs: never }`, because the type `A` is not concrete.

A `Promise` has one type variable `T` (`interface Promise<T> { ... }`), so its
`VarDescs` should be an array with one `TypeDesc`.

A type like `Promise<Map<string, number>>[]` would be described as something like:

```typescript
type MyType = {
  outer: 'Array';
  inner: [
    {
      outer: 'Promise';
      inner: [
        {
          outer: 'Map';
          inner: [
            {
              outer: 'String';
              inner: never;
            },
            {
              outer: 'Number';
              inner: never;
            }
          ];
        }
      ];
    }
  ];
};
```

`TypeCons` provides an easy way to construct a `Type`:

```typescript
export interface TypeCons<outer extends string, inner extends Type[] = never[]> {
  outer: outer;
  inner: inner;
}
```

The above example would be:

```typescript
type MyType = TypeCons<'Array', [
  TypeCons<'Promise', [
    TypeCons<'Map', [
      TypeCons<'String'>,
      TypeCons<'Number'>,
    ]
  ]>
]>;
```


- Type class definition
-
- `a` and `b` are the same from PureScript.
-
- `_0`, `_1`, `_2` and `_3` are extra type variables that instances might need,
- but are not affected by this type class.
-
- The `Instance` helper determines the concrete instance that will be used.
  \*/

```typescript
export interface Functor<f extends Type> {
  map: <a, b>(_: (_: a) => b)
    => <_0, _1, _2, _3>(_: Instance<f, [a, _0, _1, _2, _3]>)
    => Instance<f, [b, _0, _1, _2, _3]>;
}
```

/\*

- Dictionary of instances
  \*/

```typescript
export interface Dict<inner extends Type[] = never, args extends any[] = never> {
  Array: Array<args[0]>;
}
```

/\*

- Instance constructor
-
- Converts `Type` descriptions to a concrete TypeScript type using the provided
- Dictionary.
  \*/

```typescript
export type Instance<t extends Type, args extends any[]> = {
  [key in t['outer']]: key extends keyof Dict ? Dict<t['inner'], args>[key] : never
}[t['outer']];
```

/\*

- Functor instance for the Array type
  \*/

```typescript
export const functorArray: Functor<TypeCons<'Array'>> = {
  map: f => xs => xs.map(x => f(x));
};
```
