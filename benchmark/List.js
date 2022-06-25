const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

function setup() {
  class Cons {
    constructor(head, tail) {
      this.head = head;
      this.tail = tail;
    }

    [Symbol.iterator]() {
      let current = this;
      return {
        next() {
          if (current.isNil) return { done: true };
          const value = current.head;
          current = current.tail;
          return { done: false, value };
        },
      };
    }
  }
  Cons.prototype.isCons = true;
  Cons.prototype.isNil = false;

  const Nil = {
    isCons: false,
    isNil: true,
    [Symbol.iterator]() {
      return {
        next() {
          return { done: true };
        },
      };
    },
  };

  const range = start => end => {
    let list = Nil;
    for (let current = end; current >= start; current--) list = new Cons(current, list);
    return list;
  };

  const foldr_recursive = f => z => xs => {
    return xs.isNil ? z : f(xs.head)(foldr_recursive(f)(z)(xs.tail));
  };

  const foldr_iterative = f => z => xs => {
    let reversed = Nil;
    for (let current = xs; current.isCons; current = current.tail)
      reversed = new Cons(current.head, reversed);
    let acc = z;
    for (let current = reversed; current.isCons; current = current.tail) acc = f(current.head)(acc);
    return acc;
  };

  const foldr_array = f => z => xs => {
    let array = [];
    for (let current = xs; current.isCons; current = current.tail) array.push(current.head);
    let acc = z;
    for (let i = array.length - 1; i >= 0; i--) acc = f(array[i])(acc);
    return acc;
  };

  const list = range(1)(1_000);
}

suite
  .add('Original foldr', {
    setup,
    fn() {
      foldr_iterative(a => b => a + b)(0)(list);
    },
  })
  .add('Recursive foldr', {
    setup,
    fn() {
      foldr_recursive(a => b => a + b)(0)(list);
    },
  })
  .add('Array reduceRight', {
    setup,
    fn() {
      foldr_array(a => b => a + b)(0)(list);
    },
  })
  .on('start', () => {
    console.log('Start');
  })
  .on('cycle', evt => {
    console.log(String(evt.target));
  })
  .on('complete', () => {
    const stats = suite
      .slice(0, suite.length)
      .sort((a, b) => b.hz - a.hz)
      .map(({ name, hz }) => ({ name, hz }));
    if (stats.length < 2) return;
    const pct = Benchmark.formatNumber((stats[0].hz / stats[1].hz - 1) * 100);
    console.log(`${stats[0].name} is ${pct}% faster than ${stats[1].name}.`);
  })
  .on('error', evt => {
    console.error(evt.target.error);
  })
  .run();
