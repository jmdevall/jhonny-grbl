const GRBL_OUT_SEND = 'jhonny-grbl/grbl/out/GRBL_OUT';
const GRBL_OUT_BUFFER_CONSUMED = 'jhonny-grbl/grbl/out/GRBL_OUT_BUFFER_CONSUMED';

import { RequestMessage, RequestRtcMessage, RequestBlockMessage } from '../parsers/bufferRequestParse';

export interface GrblOutState {
  buffer: Buffer;
}

export const initialState = {
  buffer: Buffer.from([]),
};

export default function reducer(state: GrblOutState = initialState, action: GrblOutAction) {
  switch (action.type) {
    case GRBL_OUT_SEND:
      const grblOutSendAction = action as GrblOutSendAction;

      const message = grblOutSendAction.payload;
      switch (message.type) {
        case 'rtc':
          const rtcMessage = message as RequestRtcMessage;

          const oneByte = Buffer.alloc(1);
          oneByte.writeUInt8(rtcMessage.payload);

          return {
            ...state,
            buffer: Buffer.concat([state.buffer, oneByte]),
          };

        case 'block':
          const blockMessage = message as RequestBlockMessage;
          return {
            ...state,
            buffer: Buffer.concat([state.buffer, Buffer.from(blockMessage.payload + '\r\n')]),
          };
        default:
          throw Error('message type not found ' + message.type);
      }
    case GRBL_OUT_BUFFER_CONSUMED:
      const grblOutBufferConsumedAction = action as GrblOutBufferConsumed;

      return {
        ...state,
        buffer: state.buffer.slice(grblOutBufferConsumedAction.payload, state.buffer.length),
      };
    default:
      return state;
  }
}

export interface GrblOutSendAction {
  type: string;
  payload: RequestMessage;
}

export interface GrblOutBufferConsumed {
  type: string;
  payload: number;
}

export type GrblOutAction = GrblOutSendAction | GrblOutBufferConsumed;

export function grblOutSend(message: RequestMessage): GrblOutSendAction {
  return {
    type: GRBL_OUT_SEND,
    payload: message,
  };
}

export function grblOutBufferConsumed(numBytes: number): GrblOutBufferConsumed {
  return {
    type: GRBL_OUT_BUFFER_CONSUMED,
    payload: numBytes,
  };
}
