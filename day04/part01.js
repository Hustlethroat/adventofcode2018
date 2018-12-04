'use strict';

class Event {
  constructor (entry) {
    // [1518-04-22 00:56] falls asleep
    let groups = entry.match(/\[(\d\d\d\d-\d\d-\d\d \d\d:\d\d)\] (.*)/);
    this.timestamp = new Date(groups[1]);
    this.description = groups[2];
    this.timestamp.setHours(this.timestamp.getHours());
  }
}

let fs = require('fs');

let input = fs.readFileSync('input', 'utf8');
/*input = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up'
].join('\n');*/

let list = input
  .split('\n')
  .filter(elem => elem.length > 0)
  .map(elem => new Event(elem))
  .sort((a,b) => a.timestamp - b.timestamp);



console.log(list);

let currentDate = list[0].timestamp;
let currentEventIndex = 0;
let currentGuard = '0';
let currentMinute = 0;
let isAsleep = false;
let guardSleepCounts = { };
let guardSleepTotal = { };
let event = list[currentEventIndex];


if (event.description.match(/Guard #(\d+) begins shift/)) {
  currentGuard = event.description.replace('Guard #', '').replace(' begins shift', '');
  console.log('currentGuard', currentGuard);
}

while (true) {

  if (currentDate.getHours() === 0 && isAsleep) {
    let minute = currentDate.getMinutes();
    if (guardSleepCounts[currentGuard] == undefined) {
      guardSleepCounts[currentGuard] = [];
    }
    if (guardSleepCounts[currentGuard][minute] == undefined) {
      guardSleepCounts[currentGuard][minute] = 0;
    }
    guardSleepCounts[currentGuard][minute] ++;

    if (guardSleepTotal[currentGuard] == undefined) {
      guardSleepTotal[currentGuard] = 0;
    }
    guardSleepTotal[currentGuard] ++;
  }

  currentDate.setMinutes(currentDate.getMinutes() + 1);

  if (currentDate >= list[currentEventIndex + 1].timestamp) {
    currentEventIndex ++;
    event = list[currentEventIndex];

    if (event.description.match(/Guard #(\d+) begins shift/)) {
      currentGuard = event.description.replace('Guard #', '').replace(' begins shift', '');
      console.log('currentGuard', currentGuard);
    } else if (event.description == 'falls asleep') {
      isAsleep = true;
      console.log(`Guard ${currentGuard} falls asleep at ${currentDate}`);
    } else if (event.description == 'wakes up') {
      isAsleep = false;
      console.log(`Guard ${currentGuard} wakes up at ${currentDate}`);
    }

    if (list[currentEventIndex + 1] == undefined) {
      break;
    }
  }
}

console.log(guardSleepTotal);

let maxTotal = 0;
let maxTotalGuard;
for (let guardIndex in guardSleepTotal) {
  if (maxTotal < guardSleepTotal[guardIndex]){
    maxTotalGuard = guardIndex;
    maxTotal = guardSleepTotal[guardIndex];
  }
}

console.log(`Guard ${maxTotalGuard} slept for ${maxTotal} minutes`);

let maxMinuteAsleep = 0;
let maxMinute;
for (let minuteIndex in guardSleepCounts[maxTotalGuard]) {
  if (maxMinuteAsleep < guardSleepCounts[maxTotalGuard][minuteIndex]) {
    maxMinute = minuteIndex;
    maxMinuteAsleep = guardSleepCounts[maxTotalGuard][minuteIndex];
  }
}

console.log(`Slept most at minute ${maxMinute} ${maxMinuteAsleep} times, result ${Number(maxTotalGuard) * Number(maxMinute)}`);
