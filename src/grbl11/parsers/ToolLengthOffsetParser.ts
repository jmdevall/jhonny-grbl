import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { ToolLengthOffset } from '../responses';
import { fixedDecimals } from '../../parsers/vector';

export default class ToolLengthOffsetParser implements MessageParser<ToolLengthOffset> {
  type = 'toolLengthOffset';

  parse(message: string): ToolLengthOffset | undefined {
    return parseStartEnd(message, {
      type: 'toolLengthOffset',
      start: '[TLO:',
      end: ']',
      parsePayload: (value: string) => {
        return { value: parseFloat(value) };
      },
    });
  }
  compose(obj: ToolLengthOffset): string {
    return '[TLO:' + obj.payload.value.toFixed(fixedDecimals) + ']';
  }
}
