const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
  .add(
    'class constructor',
    () => {
      right = right.map(x => x + 1);
    },
    {
      setup() {
        class Either {}
        class Right extends Either {
          constructor(rightValue) {
            super();
            this.rightValue = rightValue;
          }
          map(f) {
            return new Right(f(this.rightValue));
          }
        }
        Right.prototype.isLeft = false;
        Right.prototype.isRight = true;
        let right = new Right(0);
      },
    }
  )
  .add(
    'External map',
    () => {
      right = map(right, x => x + 1);
    },
    {
      setup() {
        const map = (either, f) => (either.isLeft ? either : new Right(f(either.rightValue)));
        class Either {}
        class Right extends Either {
          constructor(rightValue) {
            super();
            this.rightValue = rightValue;
          }
        }
        Right.prototype.isLeft = false;
        Right.prototype.isRight = true;
        let right = new Right(0);
      },
    }
  )
  .add(
    'simple constructor',
    () => {
      right = right.map(x => x + 1);
    },
    {
      setup() {
        const Right = rightValue => ({
          isLeft: false,
          isRight: true,
          rightValue,
          map: f => Right(f(rightValue)),
        });
        let right = Right(0);
      },
    }
  )
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
    const pct = Benchmark.formatNumber((stats[0].hz / stats[1].hz - 1) * 100);
    console.log(`${stats[0].name} is ${pct}% faster than ${stats[1].name}.`);
  })
  .on('error', evt => {
    console.error(evt.target.error);
  })
  .run();
