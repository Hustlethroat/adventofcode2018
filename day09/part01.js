'use strict';

let playerCount = 9;
let maxMarbleValue = 25;

playerCount = 470; maxMarbleValue = 72170;

let circle = [0];
let playerScores = new Array(playerCount);
playerScores.fill(0);

let playerIndex = 0;
let currentMarbleIndex = 0;

for (let currentMarbleValue = 1; currentMarbleValue <= maxMarbleValue; currentMarbleValue ++) {
  if (currentMarbleValue % 10000 === 0) {
    console.log(new Date(), currentMarbleValue, maxMarbleValue);
  }
  if (currentMarbleValue % 23 === 0) {
    playerScores[playerIndex] += currentMarbleValue;
    let removalIndex = (currentMarbleIndex - 7 + circle.length) % circle.length;
    let removed = circle.splice(removalIndex, 1);
    playerScores[playerIndex] += removed[0];
    currentMarbleIndex = removalIndex;
    //console.log('[', playerIndex, ']', circle.join(' '));
    playerIndex = (playerIndex + 1) % playerCount;
  } else {
    let insertionIndex = ((currentMarbleIndex + 1) % circle.length) + 1;
    currentMarbleIndex = insertionIndex;
    circle.splice(insertionIndex, 0, currentMarbleValue);
    //console.log('[', playerIndex, ']', circle.join(' '));
    playerIndex = (playerIndex + 1) % playerCount;
  }
}

console.log(playerScores);
console.log('Max', Math.max(...playerScores));
