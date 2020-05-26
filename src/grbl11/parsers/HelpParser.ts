import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Help } from '../responses';

export default class HelpParser implements MessageParser<Help> {
  type = 'help';
  parse(message: string): Help | undefined {
    return parseStartEnd(message, {
      type: 'help',
      start: '[HLP:',
      end: ']',
      parsePayload: (value: string) => {
        return {
          value,
        };
      },
    });
  }
  compose(obj: Help): string {
    return '[HLP:' + obj.payload.value + ']';
  }
}
