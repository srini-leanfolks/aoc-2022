const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

const d1 = data
  .toString()
  .split(/\n/)
  .map((item) => {
    const [left, right] = item.split(',');
    const one = left.split('-').map((x) => parseInt(x));
    const two = right.split('-').map((x) => parseInt(x));
    if (one[0] <= two[0] && one[1] >= two[1]) {
      return true;
    }
    if (two[0] <= one[0] && two[1] >= one[1]) {
      return true;
    }
    return false;
  })
  .filter((x) => x);

console.log(d1.length);

const d2 = data
  .toString()
  .split(/\n/)
  .map((item) => {
    const [left, right] = item.split(',');
    const one = left.split('-').map((x) => parseInt(x));
    const two = right.split('-').map((x) => parseInt(x));
    if (one[0] <= two[0] && one[1] >= two[0]) {
      return true;
    }
    if (one[0] <= two[1] && one[1] >= two[1]) {
      return true;
    }
    if (two[0] <= one[0] && two[1] >= one[0]) {
      return true;
    }
    if (two[0] <= one[1] && two[1] >= one[1]) {
      return true;
    }
    return false;
  })
  .filter((x) => x);

console.log(d2.length);
