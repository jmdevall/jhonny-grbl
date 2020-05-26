import { parseStart, MessageParser } from '../../parsers/parser';
import { Error } from '../responses';

export default class ErrorParser implements MessageParser<Error> {
  type = 'error';

  parse(message: string) {
    return parseStart(message, {
      type: 'error',
      start: 'error:',
      parsePayload: (rest: string) => {
        return {
          errorcode: parseInt(rest, 10),
        };
      },
    });
  }
  compose(obj: Error): string {
    return 'error:' + obj.payload.errorcode;
  }
}
