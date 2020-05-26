import { parseStart, MessageParser } from '../../parsers/parser';
import { Settings } from '../responses';

export default class SettingsParser implements MessageParser<Settings> {
  type = 'settings';

  parse(message: string): Settings | undefined {
    return parseStart(message, {
      type: 'settings',
      start: '$',
      parsePayload: (value: string) => {
        const index = value.indexOf('=');

        const code = value.substring(0, index);
        const val = value.substring(index + 1, value.length);
        return {
          code: parseInt(code, 10),
          value: parseFloat(val),
        };
      },
    });
  }
  compose(obj: Settings): string {
    return '$' + obj.payload.code + '=' + obj.payload.value;
  }
}
