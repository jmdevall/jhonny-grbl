import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Welcome } from '../responses';

export default class WelcomeParser implements MessageParser<Welcome> {
  type = 'welcome';

  parse(message: string): Welcome | undefined {
    return parseStartEnd(message, {
      type: 'welcome',
      start: 'Grbl ',
      end: " ['$' for help]",
      parsePayload: (value: string) => {
        return { version: value };
      },
    });
  }
  compose(obj: Welcome): string {
    return 'Grbl ' + obj.payload.version + " ['$' for help]";
  }
}
