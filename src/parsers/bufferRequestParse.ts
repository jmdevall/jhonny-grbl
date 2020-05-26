import { getCharCode } from './parser';

export interface DictionaryRtc {
  [id: string]: number;
}

export default function bufferRequestParse(buffer: Buffer, realtimeCommands: DictionaryRtc): BufferRequestParseResult {
  // search for real time commands
  let index = 0;
  for (index = 0; index < buffer.length; index++) {
    const caracter = buffer.readUInt8(index);
    if (Object.values(realtimeCommands).includes(caracter)) {
      return {
        newBuffer: Buffer.concat([Buffer.from(buffer.slice(0, index)), Buffer.from(buffer.slice(index + 1))]),
        message: {
          type: 'rtc',
          payload: caracter,
        },
      };
    }
  }
  // search for blocks
  for (index = 0; index < buffer.length; index++) {
    const caracter = buffer.readUInt8(index);
    if (caracter === getCharCode('\n')) {
      const bloque = Buffer.from(buffer.slice(0, index));

      return {
        newBuffer: Buffer.from(buffer.slice(index + 1)),
        message: {
          type: 'block',
          payload: '' + bloque,
        },
      };
    }
  }

  return {
    newBuffer: buffer,
  };
}

export interface BufferRequestParseResult {
  newBuffer: Buffer;
  message?: RequestMessage;
}

export interface RequestBlockMessage {
  id?: number;
  type: string;
  payload: string;
}

export interface RequestRtcMessage {
  id?: number;
  type: string;
  payload: number;
}

export type RequestMessage = RequestBlockMessage | RequestRtcMessage;
