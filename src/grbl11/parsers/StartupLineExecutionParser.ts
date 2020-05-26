import { parseStart, MessageParser } from '../../parsers/parser';
import { StartupLineExecution } from '../responses';

export default class StartupLineExecutionParser implements MessageParser<StartupLineExecution> {
  type = 'startupLineExecution';
  parse(message: string): StartupLineExecution | undefined {
    return parseStart(message, {
      start: '>',
      type: 'startupLineExecution',
      parsePayload: (value: string) => {
        const ok = value.endsWith(':ok');
        const index = value.indexOf(':');
        const block = ok ? value.substring(0, index) : null;
        const lineError = ok ? null : parseInt(value.substring(':error:'.length, value.length), 10);
        return {
          block,
          ok,
          lineError,
        };
      },
    });
  }
  compose(obj: StartupLineExecution): string {
    if (obj.payload.ok) {
      return '>' + obj.payload.block + ':ok';
    } else {
      return '>:error:' + obj.payload.lineError;
    }
  }
}
