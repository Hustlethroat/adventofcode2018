'use strict';

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');

//input = 'aasd\r\nasdkhjkas\r\naksjdkjas\r\n';
let list = input.split('\r\n').filter(elem => elem.length > 0);


/*list = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz'
];*/

for (let firstElemIndex = 0; firstElemIndex < list.length - 1; firstElemIndex++) {
  let firstElem = list[firstElemIndex];

  for (let secondElemIndex = firstElemIndex + 1; secondElemIndex < list.length; secondElemIndex++) {
    let secondElem = list[secondElemIndex];

    for (let charIndex in firstElem) {
      let firstElemTrimmed = removeCharAt(firstElem, charIndex);
      let secondElemTrimmed = removeCharAt(secondElem, charIndex);
      if (firstElemTrimmed === secondElemTrimmed) {
        console.log(`Found pair ${firstElem} and ${secondElem}: ${firstElemTrimmed}`);
        return;
      }
    }
  }
}

function removeCharAt(elem, charIndex) {
  let firstPart = elem.substring(0, Number(charIndex));
  let secondPart = elem.substring(Number(charIndex) + 1);
  return firstPart + secondPart;
}
