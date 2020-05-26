import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Echo } from '../responses';

export default class EchoParser implements MessageParser<Echo> {
  type = 'echo';

  parse(message: string): Echo | undefined {
    return parseStartEnd(message, {
      start: '[echo:',
      end: ']',
      type: 'echo',
      parsePayload: (value: string) => {
        return {
          block: value,
        };
      },
    });
  }
  compose(obj: Echo): string {
    return '[echo:' + obj.payload.block + ']';
  }
}
