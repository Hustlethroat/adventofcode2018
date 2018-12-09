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

let rootNode = nodes[0];

console.log(getNodeValue(rootNode));

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

function getNodeValue(node) {
  if (node.children.length === 0) {
    let nodeValue = node.metadata.reduce((current,sum) => current + sum, 0);
    return nodeValue;
  }

  let nodeValue = 0;
  for (let metadataIndex in node.metadata) {
    let child = node.children[node.metadata[metadataIndex] - 1];
    if (child === undefined) {
      continue;
    }
    nodeValue += getNodeValue(child);
  }
  return nodeValue;
}
