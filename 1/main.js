const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

const out = data.toString().split(/\n\n/);
const d1 = out
  .map((item) =>
    item
      .split(/\n/)
      .filter((el) => el)
      .map((item) => Number(item))
      .reduce((acc, val) => acc + val, 0)
  )
  .sort((a, b) => b - a);

console.log(d1[0]);

const d2 = out
  .map((item) =>
    item
      .split(/\n/)
      .filter((el) => el)
      .map((item) => Number(item))
      .reduce((acc, val) => acc + val, 0)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log(d2);
