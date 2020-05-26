export interface MessageParser<T> {
  type: string;
  parse(message: string): T | undefined;
  compose(obj: T): string;
}

export interface StartEndParser<T> {
  type: string;
  start: string;
  end: string;
  parsePayload(middle: string): T | undefined;
}

export interface StartParser<T> {
  type: string;
  start: string;
  parsePayload(rest: string): T | undefined;
}

export const parseStartEnd = <T>(message: string, spec: StartEndParser<T>) => {
  if (message.startsWith(spec.start) && message.endsWith(spec.end)) {
    const value = message.substring(spec.start.length, message.length - spec.end.length);
    const payload = spec.parsePayload(value);
    if (payload === undefined) {
      return undefined;
    }
    return {
      type: spec.type,
      payload,
    };
  }
  return undefined;
};

export const parseStart = <T>(message: string, spec: StartParser<T>) => {
  return parseStartEnd<T>(message, Object.assign({}, spec, { end: '' }));
};

export const getCharCode = (character: string) => character.charCodeAt(0);
