import { parseStart, MessageParser } from '../../parsers/parser';
import { Alarm } from '../responses';

export default class AlarmParser implements MessageParser<Alarm> {
  type = 'alarm';

  parse(message: string): Alarm | undefined {
    return parseStart(message, {
      type: 'alarm',
      start: 'ALARM:',
      parsePayload: (value: string) => {
        return {
          alarmcode: parseInt(value, 10),
        };
      },
    });
  }
  compose(obj: Alarm): string {
    return 'ALARM:' + obj.payload.alarmcode;
  }
}
