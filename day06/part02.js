'use strict';

let fs = require('fs');

let input = fs
  .readFileSync('input', 'utf8')
  .split('\n')
  .filter(e => e.length > 0);

/*input = [
  '1, 1',
  '1, 6',
  '8, 3',
  '3, 4',
  '5, 5',
  '8, 9'
];*/

let coordinates = input.map(e => e.split(',').map(n => Number(n)));

console.log(coordinates);

let xMin = coordinates[0][0];
let xMax = coordinates[0][0];
let yMin = coordinates[0][1];
let yMax = coordinates[0][1];


for (let coordIndex in coordinates) {
  let coords = coordinates[coordIndex];
  xMin = Math.min(xMin, coords[0]);
  xMax = Math.max(xMax, coords[0]);
  yMin = Math.min(yMin, coords[1]);
  yMax = Math.max(yMax, coords[1]);
}

console.log(`x: ${xMin} ${xMax}; y: ${yMin} ${yMax}`);

let safeArea = 0;
for (let x = xMin; x < xMax; x ++) {
  for (let y = yMin; y < yMax; y ++) {
    let currentDistance = 0;
    for (let coordIndex in coordinates) {
      let coord = coordinates[coordIndex];
      currentDistance += Math.abs(x - coord[0]) + Math.abs(y - coord[1]);
      if (currentDistance >= 10000) {
        break;
      }
    }
    if (currentDistance < 10000) {
      safeArea ++;
    }
  }
}

console.log('size', safeArea);
