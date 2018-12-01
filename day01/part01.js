'use strict';

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');

let list = input.split('\r\n');

let frequency = 0;

for (let listIdx in list) {
  if (list[listIdx].length === 0) {
    continue;
  }

  frequency = eval(frequency + list[listIdx]);
  console.log(frequency);
}

console.log(frequency);
