# pure-ts - Translating PureScript to TypeScript

## Acknowledgements

This project is based on these previous works:

- [Haskell](https://www.haskell.org/);
- [PureScript](http://www.purescript.org/);
- [Fantasy Land](https://github.com/fantasyland/fantasy-land);
- [Static Land](https://github.com/rpominov/static-land);
- [fp-ts](https://github.com/gcanti/fp-ts);
- [TypeProps](https://github.com/SimonMeskens/TypeProps);
- [sanctuary-type-classes](https://github.com/sanctuary-js/sanctuary-type-classes)

## Motivation

In Haskell and PureScript, there are type classes, which define the signature of a function:

```purescript
class Functor f where
  map :: forall a b. (a -> b) -> f a -> f b
```

This code declares a type class called `Functor`, which is parameterized by the type variable `'f'`.

`'f'` must represent a type constructor that takes another type variable as its parameter (otherwise `'f a'` and `'f b'` would not be possible).

```purescript
instance functorArray :: Functor Array where
  map = arrayMap -- arrayMap defined elsewhere
```

Here, an instance of the type class `Functor` is provided for the type constructor `Array`.

> "A type class instance contains implementations of the functions defined in a type class, specialized to a particular type" ([PureScript by Example](https://leanpub.com/purescript/read)).

Other functions can be defined _once_, and will work on _any_ given instance of the type class:

```purescript
flap :: forall f a b. Functor f => f (a -> b) -> a -> f b
flap ff x = map (\f -> f x) ff
```

Here, a function called `flap`, which can be applied to any type `'f'` whose `Functor` instance has been defined.

### How to implement this in TypeScript?

The [Static Land](https://github.com/rpominov/static-land) specification defines a functor module as a JavaScript object having this signature (NOT actual code):

```
Functor<T> {
  map: <a, b>(a => b, T<a>) => T<b>
}
```

In the snippet above, `'T'`, `'T<a>'` and `'T<b>'` are equivalent to PureScript's `'f'`, `'f a'` and `'f b'`, respectively.

How to define `Functor` such that the following instance definition would be correctly inferred?

```typescript
const functorArray: Functor</* something representing our type */> = {
  map: (f, xs) => xs.map(x => f(x)),
};
// should be inferred as `{
//   map: <A, B>(f: (_: A) => B, fa: A[]) => B[]
// }`
```

To implement this, we should define a types dictionary:

```typescript
interface Dict<A> {
  Array: A[];
}
```

If we define `'A'` to be the concrete type `string`, we could construct an array of strings:

```typescript
type ArrayOfStrings = Dict<string>['Array']; // string[]
```

Let's create a helper called `Type`, which takes a key from our types dictionary and a type variable, and returns the concrete type:

```typescript
type Type<Key, Var> = Key extends keyof Dict<any> ? Dict<Var>[Key] : never;
```

Now we can implement our `Functor`:

```typescript
interface Functor<T> {
  map: <a, b>(f: (_: a) => b, fa: Type<T, a>) => Type<T, b>;
}

const functorArray: Functor<'Array'> = {
  map: (f, xs) => xs.map(x => f(x)),
};

const mapArray = functorArray.map;
// correctly inferred as <a, b>(f: (_: a) => b, fa: a[]) => b[]

const flap = <T>(F: Functor<T>) => <a, b>(ff: Type<T, (_: a) => b>, a: a) => F.map(f => f(a), ff); // no need to explicitly inform the return type

const flapArray = flap(functorArray);
// correctly inferred as <a, b>(ff: ((_: a) => b)[], a: a) => b[]
```

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
  map: <A, B>(_: (_: A) => B) =>
    <_0, _1, _2, _3>(_: Type<T, [A, _0, _1, _2, _3]>) =>
      Type<T, [B, _0, _1, _2, _3]>;
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

- `T extends TypeDesc` ensures the `map` function of a `Functor` instance is applied to a specific type;
- `A` and `B` are equivalent to `a` and `b` from PureScript;
- `_0`, `_1`, `_2` and `_3` are extra type variables that instances might need, but are not affected by this type class (_e.g._ the functor instance for `Map<K, V>` would only change the `V` value, so one of these extra variables would be used to represent `K`);
- `Type<T, [A, _0, _1, _2, _3]>` converts the type description `T` and the type variables `A`, `_0`, `_1`, `_2` and `_3` into a concrete type. Notice that, in the result of the `map` function, the only change is from `A` to `B`, which is the purpose of the `Functor` class. As a convention, the extra type variables (`_0`, `_1`, `_2` and `_3`) should come after the ones needed by the class (`A` or `B`).

### Types dictionary

From given example:

```typescript
export interface Dict<VarDescs extends TypeDesc[] = never, Vars extends any[] = never> {
  Array: Vars[0][];
}
```

For each instance of a type class, an entry should be added to the types dictionary, so that the `Type` constructor knows how to convert a `TypeDesc` into a concrete TypeScript type. The key of the entry should correspond to the `URI` property of the description.

The types dictionary can be thought of as a collection of functions which can operate on the values they are given.

The `VarDescs` parameter corresponds to the property with the same name in the `TypeDesc` type, _i.e._, when the description `Desc<'Array', [Desc<'Number'>]>` is being converted to a concrete type, the `Array` "function" will be given `[Desc<'Number'>]` as its `VarDescs` parameter. Its use will become clearer in the section about [superclasses](#superclasses).

The `Vars` parameter is the array of type variables passed to the `Type` constructor in the type class definition. In the example above, the `Functor` instance of the `Array` type will operate on its only type variable, so the constructed type should use the first such variable (the one concerning the `Functor` class).

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

## Superclasses
