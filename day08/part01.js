'use strict';

class Node {
  constructor() {
    this.children = [];
    this.metadata = [];
  }
}

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8')
  .split('\n')
  .filter(elem => elem.length > 0)[0];

//input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

let nodes = [];
let metadataSum = 0;

console.log(parseNode(input.split(' ').map(e => Number(e))));

for (let nodeIndex in nodes) {
  metadataSum += nodes[nodeIndex].metadata.reduce((current,sum) => current + sum, 0);
}
console.log(metadataSum);

function parseNode(inputArray) {
  let currentNode = new Node();
  nodes.push(currentNode);

  let childrenCount = inputArray[0];
  let metadataCount = inputArray[1];
  let leftoverArray = inputArray.slice(2);

  for (let childIndex = 0; childIndex < childrenCount; childIndex++) {
    let parseResult = parseNode(leftoverArray);
    currentNode.children.push(parseResult.currentNode);
    leftoverArray = parseResult.leftoverArray;
  }

  let metadataArray = leftoverArray.slice(0, metadataCount);
  currentNode.metadata = metadataArray;
  leftoverArray = leftoverArray.slice(metadataCount);

  return {
    'leftoverArray': leftoverArray,
    'currentNode': currentNode
  };
}
