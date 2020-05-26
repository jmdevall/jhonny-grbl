import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { Feedback } from '../responses';

export default class FeedbackParser implements MessageParser<Feedback> {
  type = 'feedback';

  parse(message: string): Feedback | undefined {
    return parseStartEnd(message, {
      type: 'feedback',
      start: '[MSG:',
      end: ']',
      parsePayload: (value: string) => {
        return {
          message: value,
        };
      },
    });
  }
  compose(obj: Feedback): string {
    return '[MSG:' + obj.payload.message + ']';
  }
}
