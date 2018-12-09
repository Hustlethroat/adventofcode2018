'use strict';

class Node {
  constructor (id) {
    this.id = id;
    this.children = [];
    this.parents = [];
    this.work = 60 + id.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    this.done = false;
  }
}

let fs = require('fs');

let input = fs
  .readFileSync('input', 'utf8')
  .split('\n')
  .filter(e => e.length > 0);
let workerCount = 5;

/*input = [
  'Step C must be finished before step A can begin.',
  'Step C must be finished before step F can begin.',
  'Step A must be finished before step B can begin.',
  'Step A must be finished before step D can begin.',
  'Step B must be finished before step E can begin.',
  'Step D must be finished before step E can begin.',
  'Step F must be finished before step E can begin.'
];*/

let nodes = {};
for (let inputIndex in input) {
  let row = input[inputIndex];
  let groups = row.match('.* ([A-Z]) .* ([A-Z]) .*');
  let parentId = groups[1];
  let childId = groups[2];
  if (nodes[parentId] === undefined) {
    nodes[parentId] = new Node(parentId);
  }
  if (nodes[childId] === undefined) {
    nodes[childId] = new Node(childId);
  }
  nodes[childId].parents.push(nodes[parentId]);
  nodes[parentId].children.push(nodes[childId]);
}
console.log(nodes);

let readyNodes = [];
let progressNodes = [];

for (let nodeId in nodes) {
  if (nodes[nodeId].parents.length === 0) {
    readyNodes.push(nodes[nodeId]);
  }
}

readyNodes.sort((a,b) => a.id > b.id);
console.log(readyNodes);

let currentSecond = 0;
let currentOrder = '';
let workers = new Array(workerCount);
workers.fill(undefined);

while (readyNodes.length > 0 || progressNodes.length > 0) {
  for (let progressNodeIndex in progressNodes) {
    let progressNode = progressNodes[progressNodeIndex];
    if (currentSecond < progressNode.startedAt + progressNode.work) {
      continue;
    }

    progressNode.done = true;
    workers[progressNode.worker] = undefined;
    currentOrder += progressNode.id;
    progressNodes.splice(progressNodeIndex, 1);
    for (let childIndex in progressNode.children) {
      let childNode = progressNode.children[childIndex];
      if (childNode.parents.every(e => e.done)) {
        readyNodes.push(childNode);
        readyNodes.sort((a,b) => a.id > b.id);
      }
    }
  }

  for (let workerIndex in workers) {
    if (workers[workerIndex] === undefined && readyNodes.length > 0) {
      let node = readyNodes.shift();
      workers[workerIndex] = node.id;
      node.startedAt = currentSecond;
      node.worker = workerIndex;
      progressNodes.push(node);
    }
  }
  console.log(currentSecond);
  console.log('progress', progressNodes.map(e => e.id));
  console.log('ready', readyNodes.map(e => e.id));
  currentSecond ++;
}

console.log('Done in: ', currentSecond);
console.log('Order: ', currentOrder);
