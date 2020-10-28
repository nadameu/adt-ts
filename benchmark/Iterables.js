const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
  .add(
    'Generator - for...of',
    () => {
      for (const x of iter) {
        x;
      }
    },
    {
      setup() {
        const iter = {
          *[Symbol.iterator]() {
            for (let i = 0; i < 1e6; i++) yield i;
          },
        };
      },
    }
  )
  .add(
    'Generator - next()',
    () => {
      const it = iter[Symbol.iterator]();
      for (let result = it.next(); !result.done; result = it.next()) {
        result.value;
      }
    },
    {
      setup() {
        const iter = {
          *[Symbol.iterator]() {
            for (let i = 0; i < 1e6; i++) yield i;
          },
        };
      },
    }
  )
  .add(
    'Manual iterator - for...of',
    () => {
      for (const result of iter) result;
    },
    {
      setup() {
        const iter = {
          [Symbol.iterator]() {
            let i = 0;
            return {
              next() {
                if (i < 1e6) return { done: false, value: i++ };
                return { done: true };
              },
            };
          },
        };
      },
    }
  )
  .add(
    'Manual iterator - next()',
    () => {
      const it = iter[Symbol.iterator]();
      for (let result = it.next(); !result.done; result = it.next()) {
        result.value;
      }
    },
    {
      setup() {
        const iter = {
          [Symbol.iterator]() {
            let i = 0;
            return {
              next() {
                if (i < 1e6) return { done: false, value: i++ };
                return { done: true };
              },
            };
          },
        };
      },
    }
  )
  .add(
    'LazyList',
    () => {
      for (let current = iter(); current.isCons; current = current.tail()) current.head;
    },
    {
      setup() {
        class Cons {
          constructor(head, tail) {
            this.head = head;
            this.tail = tail;
          }
        }
        Cons.prototype.isCons = true;
        Cons.prototype.isNil = false;
        class Nil {}
        Nil.prototype.isCons = false;
        Nil.prototype.isNil = true;
        const nil = new Nil();
        const make = (i, n) => () => (i < n ? new Cons(i, make(i + 1, n)) : nil);
        const iter = make(0, 1e6);
      },
    }
  )
  .on('start', () => {
    console.log('Start');
  })
  .on('cycle', (evt) => {
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
  .on('error', (evt) => {
    console.error(evt.target.error);
  })
  .run();
