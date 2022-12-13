const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

function Input() {
  const out = data.toString().split('\n');

  const parsedStacks = out
    .filter((x) => x && !x.includes('move'))
    .map((line) => {
      return [...line].filter((_value, index) => index % 4 === 1);
    });

  const moves = out
    .filter((x) => x.includes('move'))
    .map((item) => {
      const data = item.split(' ');
      return {
        move: parseInt(data[1]),
        from: parseInt(data[3]),
        to: parseInt(data[5])
      };
    });
  return {
    parsedStacks,
    moves
  };
}

const { parsedStacks, moves } = Input();
const indexes = parsedStacks.pop();
const stacks = {};

for (const line of parsedStacks) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== ' ') {
      if (!stacks[indexes[i]]) {
        stacks[indexes[i]] = [];
      }
      stacks[indexes[i]].unshift(line[i]);
    }
  }
}

moves.forEach((cmd) => {
  let from = stacks[cmd.from];
  let to = stacks[cmd.to];
  for (let i = 0; i < cmd.move; i++) {
    to.push(from.pop());
  }
});

let d1 = '';
Object.values(stacks).forEach((item) => {
  let lastItem = item[item.length - 1];
  d1 = d1 + lastItem;
});

console.log(d1);

const { parsedStacks: parsed, moves: commands } = Input();
const indexes1 = parsed.pop();
const stacks1 = {};

for (const line of parsed) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== ' ') {
      if (!stacks1[indexes1[i]]) {
        stacks1[indexes1[i]] = [];
      }
      stacks1[indexes1[i]].unshift(line[i]);
    }
  }
}

commands.forEach((cmd) => {
  const crates = stacks1[cmd.from].splice(-cmd.move, cmd.move);
  stacks1[cmd.to] = stacks1[cmd.to].concat(crates);
});

let d2 = '';
Object.values(stacks1).forEach((item) => {
  let lastItem = item[item.length - 1];
  d2 = d2 + lastItem;
});

console.log(d2);
