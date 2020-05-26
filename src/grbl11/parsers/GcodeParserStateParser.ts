import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { GcodeParserState } from '../responses';

export default class GcodeParserStateParser implements MessageParser<GcodeParserState> {
  type = 'gcodeParserState';

  parse(message: string): GcodeParserState | undefined {
    return parseStartEnd(message, {
      type: 'gcodeParserState',
      start: '[GC:',
      end: ']',
      parsePayload: (value: string) => {
        return {
          value,
        };
      },
    });
  }
  compose(obj: GcodeParserState): string {
    return '[GC:' + obj.payload.value + ']';
  }
}
