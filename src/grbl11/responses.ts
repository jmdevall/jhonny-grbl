import { Vector } from '../parsers/vector';

export interface Ok {
  type: string;
  payload: object;
}

export interface Error {
  type: string;
  payload: {
    errorcode: number;
  };
}

export interface Welcome {
  type: string;
  payload: {
    version: string;
  };
}

export interface Alarm {
  type: string;
  payload: {
    alarmcode: number;
  };
}

export interface StartupLine {
  type: string;
  payload: {
    line: number;
    value: string;
  };
}

export interface Settings {
  type: string;
  payload: {
    code: number;
    value: number;
  };
}

export interface Feedback {
  type: string;
  payload: {
    message: string;
  };
}

export interface GcodeParserState {
  type: string;
  payload: {
    value: string;
  };
}

export interface Help {
  type: string;
  payload: {
    value: string;
  };
}

export interface GcodeValue {
  type: string;
  payload: {
    gcode: number;
    value: Vector;
  };
}

export interface ToolLengthOffset {
  type: string;
  payload: {
    value: number;
  };
}

export interface Probe {
  type: string;
  payload: {
    value: Vector;
    lastProbeCicleSuccessful: boolean;
  };
}

export interface Version {
  type: string;
  payload: {
    version: string;
    string: string;
  };
}

export interface Options {
  type: string;
  payload: {
    options: string;
  };
}

export interface Echo {
  type: string;
  payload: {
    block: string;
  };
}

export interface StartupLineExecution {
  type: string;
  payload: {
    block: string | null;
    ok: boolean;
    lineError: number | null;
  };
}

export interface DictionaryVector {
  [id: string]: Vector;
}
export interface DictionaryValue {
  [id: string]: string;
}
export interface StatusReportPayload {
  state: string;
  vectors: DictionaryVector;
  values: DictionaryValue;
}
export interface StatusReport {
  type: string;
  payload: StatusReportPayload;
}

export const vectorFields = ['MPos', 'WPos', 'WCO'];

export interface VoidMessage {
  type: string;
  payload: {};
}

export type GrblResponse =
  | VoidMessage
  | Ok
  | Error
  | Welcome
  | Alarm
  | StartupLine
  | Settings
  | Feedback
  | GcodeParserState
  | GcodeValue
  | ToolLengthOffset
  | Probe
  | Version
  | Options
  | Echo
  | StartupLineExecution
  | StatusReport
  | Help;
