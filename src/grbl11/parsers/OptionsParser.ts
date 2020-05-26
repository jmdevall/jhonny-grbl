import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Options } from '../responses';

export default class OptionsParser implements MessageParser<Options> {
  type = 'options';

  parse(message: string): Options | undefined {
    return parseStartEnd(message, {
      start: '[OPT:',
      end: ']',
      type: 'options',
      parsePayload: (value: string) => {
        return {
          options: value,
        };
      },
    });
  }
  compose(obj: Options): string {
    return '[OPT:' + obj.payload.options + ']';
  }
}
