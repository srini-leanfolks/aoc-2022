const { readFileSync } = require('fs');

// const data = readFileSync('./ex.txt', { encoding: 'utf-8' });
const data = readFileSync('./in.txt', { encoding: 'utf-8' });

const out = data.toString().split('\n');

function createTree() {
  const tree = {
    name: '/',
    isDirectory: true,
    size: 0,
    children: []
  };
  let currentNode = tree;
  let currentCommand = null;

  for (const path of out) {
    if (path.startsWith('$')) {
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(path);

      currentCommand = match.groups.command;

      if (currentCommand === 'cd') {
        const directory = match.groups.arg;
        switch (directory) {
          case '/':
            currentNode = tree;
            break;
          case '..':
            currentNode = currentNode.parent;
            break;
          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.name === directory
            );
            break;
        }
      }
    } else {
      if (currentCommand === 'ls') {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(path);
        if (fileMatch) {
          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode
          };
          currentNode.children.push(node);
        }
        const dirMatch = /^dir (?<name>.+)$/.exec(path);
        if (dirMatch) {
          const nodeDir = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            size: 0,
            parent: currentNode
          };
          currentNode.children.push(nodeDir);
        }
      } else {
        throw new Error('unknown path');
      }
    }
  }
  return tree;
}

function getSize(node, directoryCallback = () => {}) {
  if (!node.isDirectory) {
    return node.size;
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0);

  directoryCallback(node.name, directorySize);

  return directorySize;
}

function part1() {
  const thresholdSize = 100000;
  const tree = createTree();

  let sumSmallFolder = 0;

  getSize(tree, (name, size) => {
    if (size < thresholdSize) {
      sumSmallFolder += size;
    }
  });

  console.log(sumSmallFolder);
}

function part2() {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const tree = createTree();

  const usedSpace = getSize(tree);
  const availableSpace = totalDiskSpace - usedSpace;
  if (availableSpace > requiredSpace) {
    throw new Error('There is already enough space');
  }
  const minimumFolderSize = requiredSpace - availableSpace;

  const candidates = [];

  getSize(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      candidates.push({
        name,
        size
      });
    }
  });

  candidates.sort((a, b) => a.size - b.size);

  console.log(candidates[0].size);
}

part1();
part2();
