'use strict';

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');
//input = '+3\r\n+3\r\n+4\r\n-2\r\n-4\r\n+5\r\n-2';

let list = input.split('\r\n');

let frequency = 0;
let seenFrequencies = [0];
let listIdx = 0;

let now = new Date();

while (true) {

  if (list[listIdx].length === 0) {
    listIdx = (listIdx + 1) % list.length;
    continue;
  }

  //frequency = eval(frequency + list[listIdx]);

  //let number = Number(list[listIdx]);
  frequency += Number(list[listIdx]);

  if (seenFrequencies.indexOf(frequency) >= 0) {
    console.log('seen frequency', frequency);
    break;
  }
  seenFrequencies.push(frequency);
  //console.log(frequency);
  listIdx = (listIdx + 1) % list.length;
}

console.log(frequency);
console.log(new Date() - now);
