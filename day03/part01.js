'use strict';

class Fabric {
  constructor() {
    this.fabric = [];
  }

  get(x,y) {
    x = Number(x);
    y = Number(y);
    if (this.fabric[x]) {
      return this.fabric[x][y];
    }
    return undefined;
  }

  set(x,y,val) {
    x = Number(x);
    y = Number(y);
    if (this.fabric[x] === undefined) {
      this.fabric[x] = [];
    }
    if (this.fabric[x][y] === undefined) {
      this.fabric[x][y] = [];
    }
    this.fabric[x][y].push(val);
  }

  applyClaim(claim) {
    for (let x = claim.x; x < claim.x + claim.width; x++) {
      for (let y = claim.y; y < claim.y + claim.height; y++) {
        this.set(x, y, claim.id);
      }
    }
  }

  getOverlapCount() {
    let overlapCount = 0;
    for (let xIndex in this.fabric) {
      for (let yIndex in this.fabric[xIndex]) {
        let vals = this.get(xIndex, yIndex);
        console.log(vals, xIndex, yIndex);
        if (vals && vals.length > 1) {
          overlapCount ++;
        }
      }
    }
    return overlapCount;
  }
}

class Claim {
  constructor (claimString) {
    let groups = claimString.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    this.id = Number(groups[1]);
    this.x = Number(groups[2]);
    this.y = Number(groups[3]);
    this.width = Number(groups[4]);
    this.height = Number(groups[5]);
  }
}

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');

let list = input.split('\n').filter(elem => elem.length > 0);
/*list = [
  '#1 @ 1,3: 4x4',
  '#2 @ 3,1: 4x4',
  '#3 @ 5,5: 2x2'
];*/

let fabric = new Fabric();

for (let claimIndex in list) {
  let claimString = list[claimIndex];
  let claim = new Claim(claimString);
  console.log(claim);
  fabric.applyClaim(claim);
}

console.log(fabric.getOverlapCount());
