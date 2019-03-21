# pure-ts - Translating PureScript to TypeScript

## Example

In PureScript:

```purescript
class Functor f where
  map :: forall a b. (a -> b) -> f a -> f b

instance functorArray :: Functor Array where
  map = arrayMap
```

In TypeScript:

<!-- prettier-ignore -->
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
  result: T['URI'] extends keyof Dict ? Dict<T['VarDescs'], Vars>[T['URI']] : never;
}['result'];

export const functorArray: Functor<Desc<'Array'>> = {
  map: f => xs => xs.map(x => f(x)),
};
const mapArray = functorArray.map; // <A, B>(_: (_: A) => B) => <_0, _1, _2, _3>(_: A[]) => B[]
```

## How does it work?

### Type description

From given example:

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

`Desc` provides an easy way to construct a `TypeDesc`:

```typescript
export interface Desc<URI extends string, VarDescs extends TypeDesc[] = never[]> {
  URI: URI;
  VarDescs: VarDescs;
}
```

So `Desc<'Array', [Desc<'Number'>]>` would become `{ URI: 'Array'; VarDescs: [{ URI: 'Number'; VarDescs: never; }]; }`

#### URI

The URI of native JavaScript types should be the same string returned by `Object.prototype.toString.call(...)` (minus the `[object` prefix and `]` suffix):

```javascript
const array = [];
const arrayURI = Object.prototype.toString.call(array).slice(8, -1);
console.log(arrayURI); // 'Array'
```

For user-defined types, it should follow the [sanctuary-js](https://github.com/sanctuary-js/sanctuary-type-identifiers) convention: `'<namespace>/<name>[@<version>]'` (_e.g._ `'@my-scope/my-package/MyFunctor'` or `'my-package/MyFunctor@3'`).

#### Type variables

The `VarDescs` parameter should only describe _concrete_ type variables, _i.e._:

- For a function like `<A>(xs: Array<A>): number`, the type description of `xs` would be `Desc<'Array'>`, because the type `A` is not concrete.
- In a case like `(xs: Array<number>): number`, the description of the type of `xs` would be `Desc<'Array', [Desc<'Number'>]>`, because `number` is a concrete type.

The length of the array in `VarDescs` depends on the number of type variables the base type has.

- For a type like `number`, its `VarDescs` would be empty, because it has no type variables: `Desc<'Number'>`;
- A `Promise` has only one type variable, `T` (`interface Promise<T> { ... }`), so its `VarDescs` should be an array with one `TypeDesc`. The description of `Promise<string>` would be `Desc<'Promise', [Desc<'String'>]>`;
- A `Map` has two type variables, `K` and `V` (`interface Map<K, V> { ... }`). Its description's `VarDescs` should be an array with two `TypeDesc`s. `Map<string, Date>` would be `Desc<'Map', [Desc<'String'>, Desc<'Date'>]>`.

A type like `Promise<Map<string, number>>[]` would be described as something like:

<!-- prettier-ignore -->
```typescript
type MyType = Desc<'Array', [
  Desc<'Promise', [
    Desc<'Map', [
      Desc<'String'>,
      Desc<'Number'>,
    ]>
  ]>
]>;
```

### Type class definition

From given example:

<!-- prettier-ignore -->
```typescript
export interface Functor<T extends TypeDesc> {
  map: <A, B>(_: (_: A) => B)
    => <_0, _1, _2, _3>(_: Type<T, [A, _0, _1, _2, _3]>)
    => Type<T, [B, _0, _1, _2, _3]>;
}
```

- `T extends TypeDesc` ensures the `map` function of a `Functor` instance is applied to a specific type.

- Type class definition
-
- `a` and `b` are the same from PureScript.
-
- `_0`, `_1`, `_2` and `_3` are extra type variables that instances might need,
- but are not affected by this type class.
-
- The `Instance` helper determines the concrete instance that will be used. \*/

/\*

- Dictionary of instances \*/

```typescript
export interface Dict<inner extends Type[] = never, args extends any[] = never> {
  Array: Array<args[0]>;
}
```

/\*

- Instance constructor
-
- Converts `Type` descriptions to a concrete TypeScript type using the provided
- Dictionary. \*/

```typescript
export type Instance<t extends Type, args extends any[]> = {
  [key in t['outer']]: key extends keyof Dict ? Dict<t['inner'], args>[key] : never
}[t['outer']];
```

/\*

- Functor instance for the Array type \*/

```typescript
export const functorArray: Functor<TypeCons<'Array'>> = {
  map: f => xs => xs.map(x => f(x));
};
```
