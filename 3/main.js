const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

const out = data
  .toString()
  .split(/\n/)
  .map((item) => {
    return [
      item.slice(0, item.length / 2).split(''),
      item.slice(item.length / 2, item.length).split('')
    ];
  });

function findChar(params) {
  const dd = params.charCodeAt() - 96;
  return dd < 0 ? dd + 58 : dd;
}

const d1 = out
  .map((item) => item[0].filter((el) => item[1].includes(el))[0])
  .reduce((prev, curr) => prev + findChar(curr), 0);

console.log(d1);

function splitToChunks(array, parts) {
  const result = [];
  for (let i = Math.ceil(array.length / parts); i > 0; i--) {
    result.push(array.splice(0, parts));
  }
  return result;
}

const array = data
  .toString()
  .split(/\n/)
  .map((item) => item.split(''));

const d2 = splitToChunks(array, 3)
  .map((item) => {
    const res = item[0].filter((el) => {
      return item[1].includes(el) && item[2].includes(el);
    });
    return findChar(res[0]);
  })
  .reduce((prev, curr) => prev + curr, 0);
console.log(d2);
