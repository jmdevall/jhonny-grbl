import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Probe } from '../responses';
import { composePositionVector } from '../../parsers/vector';

export default class ProbeParser implements MessageParser<Probe> {
  type = 'probe';
  parse(message: string): Probe | undefined {
    return parseStartEnd(message, {
      start: '[PRB:',
      end: ']',
      type: 'probe',
      parsePayload: (value: string) => {
        const index = value.indexOf(':');
        const values = value.substring(0, index).split(',');
        const lastProbeCicleSuccessful = value.substring(index + 1, value.length);

        return {
          value: {
            x: parseFloat(values[0]),
            y: parseFloat(values[1]),
            z: parseFloat(values[2]),
          },
          lastProbeCicleSuccessful: lastProbeCicleSuccessful === '1',
        };
      },
    });
  }
  compose(obj: Probe): string {
    return (
      '[PRB:' +
      composePositionVector(obj.payload.value) +
      ':' +
      (obj.payload.lastProbeCicleSuccessful ? '1' : '0') +
      ']'
    );
  }
}
