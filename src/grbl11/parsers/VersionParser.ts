import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Version } from '../responses';

export default class VersionParser implements MessageParser<Version> {
  type = 'version';

  parse(message: string): Version | undefined {
    return parseStartEnd(message, {
      start: '[VER:',
      end: ']',
      type: 'version',
      parsePayload: (value: string) => {
        const index = value.indexOf(':');

        return {
          version: value.substring(0, index),
          string: value.substring(index + 1, value.length),
        };
      },
    });
  }
  compose(obj: Version): string {
    return '[VER:' + obj.payload.version + ':' + obj.payload.string + ']';
  }
}
