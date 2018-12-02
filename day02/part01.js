'use strict';

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');

//input = 'aasd\r\nasdkhjkas\r\naksjdkjas\r\n';
let list = input.split('\r\n').filter(elem => elem.length > 0);


/*list = [
  'abcdef',
  'bababc',
  'abbcde',
  'abcccd',
  'aabcdd',
  'abcdee',
  'ababab'
];*/

let foundTwosCount = 0;
let foundThreesCount = 0;

for (let listIndex in list) {
  let result = checkLetters(list[listIndex]);
  if (result.foundTwos) {
    foundTwosCount ++;
  }
  if (result.foundThrees) {
    foundThreesCount ++;
  }
}
console.log(`Found twos ${foundTwosCount} times`);
console.log(`Found threes ${foundThreesCount} times`);
console.log(`Checksum: ${foundThreesCount * foundTwosCount}`);

function checkLetters(elem) {
  let foundTwos = false;
  let foundThrees = false;

  console.log(`Checking, ${elem}`);

  for (let charIndex in elem) {
    let char = elem[charIndex];
    let matcher = new RegExp(char, 'g');
    let foundChars = elem.match(matcher);

    if (!foundTwos && foundChars.length === 2) {
      foundTwos = true;
      console.log(`Found twos, ${char}`);
    }
    if (!foundThrees && foundChars.length === 3) {
      foundThrees = true;
      console.log(`Found threes, ${char}`);
    }
    if (foundTwos && foundThrees) {
      break;
    }
  }

  return {
    foundTwos: foundTwos,
    foundThrees: foundThrees
  };
}
