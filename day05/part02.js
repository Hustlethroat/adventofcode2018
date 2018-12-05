'use strict';

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');

let polymer = input
  .split('\n')
  .filter(elem => elem.length > 0)[0];

//polymer = 'dabAcCaCBAcCcaDA';

let symbols = [];
for (let charIndex in polymer) {
  let char = polymer[charIndex];
  if (symbols.indexOf(char.toLowerCase()) < 0) {
    symbols.push(char.toLowerCase());
  }
}
console.log(symbols);

for (let symbolIndex in symbols) {
  let re = new RegExp(symbols[symbolIndex], 'gi');
  let cutPolymer = polymer.replace(re, '');
  console.log(symbols[symbolIndex], getPolymerLength(cutPolymer));
}

function getPolymerLength(polymer) {
  let hadChanges = true;
  while (hadChanges) {
    let newPolymer = '';
    hadChanges = false;
    for (let charIndex = 0; charIndex < polymer.length; charIndex++) {
      let currentChar = polymer[charIndex];
      let nextChar = polymer[charIndex + 1];
      if (currentChar && nextChar && currentChar != nextChar && currentChar.toLowerCase() == nextChar.toLowerCase()) {
        hadChanges = true;
        charIndex ++;
      } else {
        newPolymer += currentChar;
      }
    }
    polymer = newPolymer;
  }
  return polymer.length;
}
console.log('Result', getPolymerLength(polymer));
