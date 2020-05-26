import { parseStart, MessageParser } from '../../parsers/parser';
import { StartupLine } from '../responses';

export default class StartupLineParser implements MessageParser<StartupLine> {
  type = 'startupLine';

  parse(message: string): StartupLine | undefined {
    return parseStart(message, {
      type: 'startupLine',
      start: '$N',
      parsePayload: (value: string) => {
        const index = value.indexOf('=');

        const line = value.substring(0, index);
        const val = value.substring(index + 1, value.length);
        return {
          line: parseInt(line, 10),
          value: val,
        };
      },
    });
  }
  compose(obj: StartupLine): string {
    return '$N' + obj.payload.line + '=' + obj.payload.value;
  }
}
