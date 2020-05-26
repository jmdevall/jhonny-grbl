import { getCharCode } from '../parsers/parser';

const realtimeCommands = {
  softReset: 0x18,
  statusReportQuery: getCharCode('?'),
  cicleStart: getCharCode('~'),
  feedHold: getCharCode('!'),
  safetyDoor: 0x84,
  jogCancel: 0x85,
  feedOver100: 0x90,
  feedOverIncrease10: 0x91,
  feedOverDecrease10: 0x92,
  feedOverIncrease1: 0x93,
  feedOverDecrease1: 0x94,
  rapidOver100: 0x95,
  rapidOver50: 0x96,
  rapidOver25: 0x97,
  speedOver100: 0x99,
  speedOverIncrease10: 0x9a,
  speedOverDecrease10: 0x9b,
  speedOverIncrease1: 0x9c,
  speedOverDecrease1: 0x9d,
  spindleStop: 0x9e,
  floodCoolant: 0xa0,
  mistCoolant: 0xa1,
};

export { realtimeCommands };
