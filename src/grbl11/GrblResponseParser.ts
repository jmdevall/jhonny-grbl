import { GrblResponse } from './responses';
import { MessageParser } from '../parsers/parser';

import OkParser from './parsers/OkParser';
import ErrorParser from './parsers/ErrorParser';
import WelcomeParser from './parsers/WelcomeParser';
import AlarmParser from './parsers/AlarmParser';
import StartupLineParser from './parsers/StartupLineParser';
import SettingsParser from './parsers/SettingsParser';
import FeedbackParser from './parsers/FeedbackParser';
import GcodeParserStateParser from './parsers/GcodeParserStateParser';
import HelpParser from './parsers/HelpParser';
import GcodeValueParser from './parsers/GcodeValueParser';
import ToolLengthOffsetParser from './parsers/ToolLengthOffsetParser';
import ProbeParser from './parsers/ProbeParser';
import VersionParser from './parsers/VersionParser';
import OptionsParser from './parsers/OptionsParser';
import EchoParser from './parsers/EchoParser';
import StartupLineExecutionParser from './parsers/StartupLineExecutionParser';
import StatusReportParser from './parsers/StatusReportParser';
import VoidMessageParser from './parsers/VoidMessageParser';

const specs: MessageParser<GrblResponse>[] = [
  new VoidMessageParser(),
  new OkParser(),
  new ErrorParser(),
  new WelcomeParser(),
  new AlarmParser(),
  new StartupLineParser(),
  new SettingsParser(),
  new FeedbackParser(),
  new GcodeParserStateParser(),
  new GcodeValueParser(),
  new ToolLengthOffsetParser(),
  new ProbeParser(),
  new VersionParser(),
  new OptionsParser(),
  new EchoParser(),
  new StartupLineExecutionParser(),
  new StatusReportParser(),
  new HelpParser(),
];

export default class GrblResponseParser implements MessageParser<GrblResponse> {
  type = 'grbl11';
  parse(message: string): GrblResponse | undefined {
    const parsedMessages = specs.reduce<GrblResponse | undefined>((previoousValue, currentValue, currentIndex, array):
      | GrblResponse
      | undefined => {
      if (previoousValue !== undefined) {
        return previoousValue;
      }
      return currentValue.parse(message);
    }, undefined);

    if (parsedMessages === undefined) {
      throw new Error('cant parse');
    }
    return parsedMessages;
  }
  compose(obj: GrblResponse): string {
    const composed = specs.reduce<string | undefined>((previoousValue, currentValue, currentIndex, array):
      | string
      | undefined => {
      return previoousValue !== undefined
        ? previoousValue
        : currentValue.type === obj.type
        ? currentValue.compose(obj)
        : undefined;
    }, undefined);
    if (composed === undefined) {
      throw new Error('obj type not composable: ' + obj.type);
    }
    return composed;
  }
}
