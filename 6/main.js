const { readFileSync } = require('fs');

function Input() {
  // const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
  const data = readFileSync('./in.txt', { encoding: 'utf-8' });

  const out = data.toString().split('\n').at(0);
  return out;
}

function isUnique(array) {
  return new Set(array).size === array.length;
}

function part1() {
  const elem = Input();
  const slidingWindow = [];
  for (let i = 0; i < elem.length; i++) {
    slidingWindow.push(elem[i]);
    if (slidingWindow.length > 4) {
      slidingWindow.shift();
    }
    if (slidingWindow.length === 4 && isUnique(slidingWindow)) {
      console.log(i + 1);
      break;
    }
  }
}

function part2() {
  const elem = Input();
  const slidingWindow = [];
  for (let i = 0; i < elem.length; i++) {
    slidingWindow.push(elem[i]);
    if (slidingWindow.length > 14) {
      slidingWindow.shift();
    }
    if (slidingWindow.length === 14 && isUnique(slidingWindow)) {
      console.log(i + 1);
      break;
    }
  }
}

part1();
part2();
