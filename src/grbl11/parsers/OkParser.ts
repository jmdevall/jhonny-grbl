import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Ok } from '../responses';

export default class OkParser implements MessageParser<Ok> {
  type = 'ok';

  parse(message: string) {
    return parseStartEnd(message, {
      type: 'ok',
      start: 'ok',
      end: 'ok',
      parsePayload: (middle: string) => {
        return {};
      },
    });
  }
  compose(obj: Ok) {
    return 'ok';
  }
}
