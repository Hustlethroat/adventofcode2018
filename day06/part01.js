'use strict';

class Grid {
  constructor () {
    this.grid = [];
  }

  get(x, y) {
    if (this.grid[x]) {
      return this.grid[x][y];
    }
    return undefined;
  }

  set(x, y, val) {
    if (this.grid[x] === undefined) {
      this.grid[x] = [];
    }
    this.grid[x][y] = val;
  }
}

let fs = require('fs');

let input = fs
  .readFileSync('input', 'utf8')
  .split('\n')
  .filter(e => e.length > 0);
/*
input = [
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

let grid = new Grid();

for (let coordIndex in coordinates) {
  let coords = coordinates[coordIndex];
  grid.set(coords[0], coords[1], { 'closest': coordIndex, 'distance': 0 });
  xMin = Math.min(xMin, coords[0]);
  xMax = Math.max(xMax, coords[0]);
  yMin = Math.min(yMin, coords[1]);
  yMax = Math.max(yMax, coords[1]);
}

printTable();

let hasUndefined = true;
let distance = 0;
let areaSizes = new Array(coordinates.length);
areaSizes.fill(1);

while (hasUndefined) {
  hasUndefined = false;
  for (let x = xMin; x <= xMax; x ++) {
    for (let y = yMin; y <= yMax; y ++) {
      let currentPoint = grid.get(x, y);
      if (currentPoint) {
        continue;
      }

      hasUndefined = true;

      let neighbours = [
        grid.get(x - 1, y),
        grid.get(x + 1, y),
        grid.get(x, y - 1),
        grid.get(x, y + 1)
      ];

      let definedNeighbours = neighbours.filter(e => e && e.distance === distance);
      if (definedNeighbours.length === 0) {
        continue;
      }

      if (definedNeighbours.every(e => e.closest === definedNeighbours[0].closest)) {
        grid.set(x, y, { 'closest': definedNeighbours[0].closest, 'distance': distance + 1 });
        areaSizes[definedNeighbours[0].closest] ++;
      } else {
        grid.set(x, y, { 'closest': undefined, 'distance': distance + 1 });
      }
    }
  }
  distance ++;
}

printTable();

for (let x = xMin; x <= xMax; x ++) {
  let point = grid.get(x, yMin);
  if (point.closest && areaSizes[point.closest]) {
    areaSizes[point.closest] = undefined;
  }

  point = grid.get(x, yMax);
  if (point.closest && areaSizes[point.closest]) {
    areaSizes[point.closest] = undefined;
  }
}

for (let y = yMin; y <= yMax; y ++) {
  let point = grid.get(xMin, y);
  if (point.closest && areaSizes[point.closest]) {
    areaSizes[point.closest] = undefined;
  }

  point = grid.get(xMax, y);
  if (point.closest && areaSizes[point.closest]) {
    areaSizes[point.closest] = undefined;
  }
}

console.log(areaSizes);
console.log('max', Math.max(...areaSizes.filter(e => e)));

function printTable() {
  let table = '';
  for (let x = xMin; x < xMax; x ++) {
    let row = '';
      for (let y = yMin; y < yMax; y ++) {
      let point = grid.get(y, x);
      if (point) {
        row += point.closest ? point.closest : '.';
      } else {
        row += '-';
      }

    }
    table += row + '\n';
  }
  console.log(table);
}





console.log(`x: ${xMin} ${xMax}; y: ${yMin} ${yMax}`);
