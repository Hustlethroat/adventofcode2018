'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = undefined;
    this.previous = undefined;
  }
}

let playerCount = 9;
let maxMarbleValue = 25;

playerCount = 470; maxMarbleValue = 72170 * 100;

let playerScores = queueSolution();

//console.log(playerScores);
console.log('Max', Math.max(...playerScores));

// queue solution
function queueSolution() {
  let playerIndex = 0;
  let playerScores = new Array(playerCount);
  playerScores.fill(0);

  let currentNode = new Node(0);
  currentNode.next = currentNode;
  currentNode.previous = currentNode;

  for (let currentMarbleValue = 1; currentMarbleValue <= maxMarbleValue; currentMarbleValue ++) {
    if (currentMarbleValue % 23 === 0) {
      playerScores[playerIndex] += currentMarbleValue;
      let nodeToRemove = currentNode;
      for (let stepIndex = 0; stepIndex < 7; stepIndex ++) {
        nodeToRemove = nodeToRemove.previous;
      }
      playerScores[playerIndex] += nodeToRemove.value;
      nodeToRemove.previous.next = nodeToRemove.next;
      nodeToRemove.next.previous = nodeToRemove.previous;
      currentNode = nodeToRemove.next;
    } else {
      let newNode = new Node(currentMarbleValue);
      let insertAfterNode = currentNode.next;
      let insertBeforeNode = insertAfterNode.next;

      insertAfterNode.next = newNode;
      newNode.previous = insertAfterNode;
      newNode.next = insertBeforeNode;
      insertBeforeNode.previous = newNode;
      currentNode = newNode;
    }
    playerIndex = (playerIndex + 1) % playerCount;
  }
  return playerScores;
}
