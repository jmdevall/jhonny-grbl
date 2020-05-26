import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { GcodeValue } from '../responses';
import { composePositionVector } from '../../parsers/vector';

export default class GcodeValueParser implements MessageParser<GcodeValue> {
  type = 'gcodeValue';

  parse(message: string): GcodeValue | undefined {
    return parseStartEnd(message, {
      start: '[G',
      end: ']',
      type: 'gcodeValue',
      parsePayload: (value: string) => {
        const index = value.indexOf(':');
        const gcode = value.substring(0, index);
        const values = value.substring(index + 1, value.length);
        const splitValues = values.split(',');

        return {
          gcode: parseInt(gcode, 10),
          value: {
            x: parseFloat(splitValues[0]),
            y: parseFloat(splitValues[1]),
            z: parseFloat(splitValues[2]),
          },
        };
      },
    });
  }
  compose(obj: GcodeValue): string {
    return '[G' + obj.payload.gcode + ':' + composePositionVector(obj.payload.value) + ']';
  }
}
