'use strict';

class Node {
  constructor (id) {
    this.id = id;
    this.dependsOn = [];
    this.dependants = [];
    this.done = false;
  }
}

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');
/*input =
  'Step C must be finished before step A can begin.\n' +
  'Step C must be finished before step F can begin.\n' +
  'Step A must be finished before step B can begin.\n' +
  'Step A must be finished before step D can begin.\n' +
  'Step B must be finished before step E can begin.\n' +
  'Step D must be finished before step E can begin.\n' +
  'Step F must be finished before step E can begin.\n';*/

let lines = input.split('\n').filter(e => e.length > 0);

let nodes = {};

for (let lineIndex in lines) {
  let line = lines[lineIndex];
  let groups = line.match('^.* ([A-Z]) .* ([A-Z]) .*$');
  let dependantId = groups[2];
  let dependsOnId = groups[1];

  if (nodes[dependantId] == undefined) {
    nodes[dependantId] = new Node(dependantId);
  }
  nodes[dependantId].dependsOn.push(dependsOnId);

  if (nodes[dependsOnId] == undefined) {
    nodes[dependsOnId] = new Node(dependsOnId);
  }
  nodes[dependsOnId].dependants.push(dependantId);
}

let readyNodesId = [];
let doneNodesId = [];

for (let nodeIndex in nodes) {
  let node = nodes[nodeIndex];
  node.dependants.sort();
  node.dependsOn.sort();
  if (node.dependsOn.length === 0) {
    readyNodesId.push(node.id);
  }
}

let currentPath = '';
while (readyNodesId.length > doneNodesId.length) {
  console.log('ready', readyNodesId);
  readyNodesId.sort();
  for (let readyNodesIdIndex in readyNodesId) {
    let node = nodes[readyNodesId[readyNodesIdIndex]];
    if (node.done) {
      continue;
    }
    node.done = true;
    doneNodesId.push(node.id);
    currentPath += node.id;
    console.log('Doing', node.id, 'path', currentPath);

    for (let dependatsIndex in node.dependants) {
      let dependantNode = nodes[node.dependants[dependatsIndex]];
      console.log('checking node', dependantNode.id);
      if (isNodeReady(dependantNode) && readyNodesId.indexOf(dependantNode.id) < 0) {
        readyNodesId.push(dependantNode.id);
      }
    }
    break;
  }
}

function isNodeReady(node) {
  let isReady = true;
  for (let dependsOnIndex in node.dependsOn) {
    let dependsOnNode = nodes[node.dependsOn[dependsOnIndex]];
    if (!dependsOnNode.done) {
      isReady = false;
      break;
    }
  }
  return isReady;
}


////////

/*
let result = followNodes(initialNodesId, '');
console.log(result, result.length);

function followNodes(nodesId, currentPath) {
  for (let nodeIndex in nodesId) {
    let node = nodes[nodesId[nodeIndex]];
    console.log('checking node', node.id);

    let isDone = true;
    for (let dependsOnIndex in node.dependsOn) {
      let dependsOnNode = nodes[node.dependsOn[dependsOnIndex]];
      console.log('depends on node', dependsOnNode.id, dependsOnNode.done);
      if (!dependsOnNode.done) {
        isDone = false;
        break;
      }
    }
    console.log('node', node.id, 'is done: ', isDone);

    if (isDone) {
      if (!node.done) {
        currentPath += node.id;
        console.log('current path', currentPath);
      }
      node.done = true;

      if (node.dependants.length === 0) {
        return currentPath;
      } else {
        currentPath = followNodes(node.dependants, currentPath);
      }
    }
  }
  return currentPath;
}
*/
