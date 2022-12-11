const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

const value = {
  A: 'X',
  B: 'Y',
  C: 'Z',
  X: 1,
  Y: 2,
  Z: 3,
  AX: 'Z',
  BX: 'X',
  CX: 'Y',
  AZ: 'Y',
  BZ: 'Z',
  CZ: 'X'
};

const out = data
  .toString()
  .split(/\n/)
  .map((item) => item.split(' '));

const d1 = out
  .map((item) => {
    const op = item[0];
    const me = item[1];
    if (value[op] === me) {
      return value[me] + 3;
    } else if (
      (op === 'A' && me === 'Y') ||
      (op === 'B' && me === 'Z') ||
      (op === 'C' && me === 'X')
    ) {
      return value[me] + 6;
    } else {
      return value[me];
    }
  })
  .reduce((acc, val) => acc + val, 0);

console.log(d1);

const d2 = out
  .map((item) => {
    const op = item[0];
    const me = item[1];
    if (me === 'Y') {
      const x = value[op];
      return value[x] + 3;
    } else if (me === 'Z') {
      const x = value[op + me];
      return value[x] + 6;
    } else {
      const x = value[op + me];
      return value[x];
    }
  })
  .reduce((acc, val) => acc + val, 0);

console.log(d2);
