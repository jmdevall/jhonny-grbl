import { MessageParser } from '../../parsers/parser';
import { VoidMessage } from '../responses';

export default class VoidMessageParser implements MessageParser<VoidMessage> {
  type = 'void';
  parse(message: string): VoidMessage | undefined {
    if (message === '') {
      return {
        type: 'void',
        payload: {},
      };
    } else {
      return undefined;
    }
  }
  compose(obj: VoidMessage): string {
    return '\r\n';
  }
}
