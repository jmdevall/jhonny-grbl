import { MessageParser } from '../parsers/parser';

const HOST_OUT_SEND = 'jhonny-grbl/host/out/HOST_OUT_SEND';
const HOST_OUT_BUFFER_CONSUMED = 'jhonny-grbl/host/out/HOST_OUT_BUFFER_CONSUMED';

export interface HostOutState {
  buffer: Buffer;
}

export const initialState = {
  buffer: Buffer.from([]),
};

const reducer = <T>(grblResponseParser: MessageParser<T>) => (state = initialState, action: HostOutAction<T>) => {
  switch (action.type) {
    case HOST_OUT_SEND:
      const hostOutSendAction = action as HostOutAction<T>;
      const message: T = hostOutSendAction.payload as T;
      const responseBuffer = Buffer.from(grblResponseParser.compose(message) + '\r\n');

      const newBuffer = Buffer.concat([state.buffer, responseBuffer]);
      return {
        ...state,
        buffer: newBuffer,
      };

    case HOST_OUT_BUFFER_CONSUMED:
      const hostOutBufferConsumedAction = action as HostOutBufferConsumedAction;
      return {
        ...state,
        buffer: state.buffer.slice(hostOutBufferConsumedAction.payload, state.buffer.length),
      };

    default:
      return state;
  }
};

export default reducer;

export interface HostOutSendAction<T> {
  type: string;
  payload: T;
}

export interface HostOutBufferConsumedAction {
  type: string;
  payload: number;
}

export type HostOutAction<T> = HostOutSendAction<T> | HostOutBufferConsumedAction;

export function hostOutSend<T>(responseMessage: T): HostOutSendAction<T> {
  return {
    type: HOST_OUT_SEND,
    payload: responseMessage,
  };
}

export function hostOutBufferConsumed(numBytes: number): HostOutBufferConsumedAction {
  return {
    type: HOST_OUT_BUFFER_CONSUMED,
    payload: numBytes,
  };
}
