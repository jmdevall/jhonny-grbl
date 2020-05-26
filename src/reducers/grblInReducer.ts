import bufferLineParse from '../parsers/bufferResponseParse';
import { MessageParser } from '../parsers/parser';

const GRBL_IN_ADDBUFFER = 'jhonny-grbl/grbl/in/GRBL_IN_ADDBUFFER';
const GRBL_IN_CONSUMED = 'jhonny-grbl/grbl/in/GRBL_IN_CONSUMED';

export interface GrblInState<T> {
  buffer: Buffer;
  grblResponses: NumberedMessage<T>[];
  lastId: number;
}

export interface NumberedMessage<T> {
  id: number;
  message: T;
}

export const initialState = {
  buffer: Buffer.from([]),
  grblResponses: [],
  lastId: 0,
};

export default <T>(messageParser: MessageParser<T>) => (state: GrblInState<T> = initialState, action: GrblInAction) => {
  switch (action.type) {
    case GRBL_IN_ADDBUFFER:
      const grblInAddBufferAction = action as GrblInAddBufferAction;

      let newBuffer = Buffer.concat([state.buffer, grblInAddBufferAction.payload]);

      let newId = state.lastId;
      let line = bufferLineParse(newBuffer);
      newBuffer = line.newBuffer;
      const newMessages = [];

      while (line.message !== undefined) {
        const parsedGrblResponse = messageParser.parse(line.message);
        if (parsedGrblResponse === undefined) {
          return state;
        }
        newId++;
        newMessages.push({
          id: newId,
          message: parsedGrblResponse,
        });

        line = bufferLineParse(newBuffer);
        newBuffer = line.newBuffer;
      }

      const res = {
        ...state,
        buffer: newBuffer,
        grblResponses: [...state.grblResponses, ...newMessages],
        lastId: newId,
      };
      return res;

    case GRBL_IN_CONSUMED:
      const grblInConsumedAction = action as GrblInConsumedAction;
      return {
        ...state,
        grblResponses: state.grblResponses.filter((message) => {
          return message.id !== grblInConsumedAction.payload;
        }),
      };

    default:
      return state;
  }
};

export interface GrblInAddBufferAction {
  type: string;
  payload: Buffer;
}

export interface GrblInConsumedAction {
  type: string;
  payload: number;
}

export type GrblInAction = GrblInAddBufferAction | GrblInConsumedAction;

export function grblInAddBuffer(data: Buffer): GrblInAddBufferAction {
  return {
    type: GRBL_IN_ADDBUFFER,
    payload: data,
  };
}

export function grblInConsumed(id: number): GrblInConsumedAction {
  return {
    type: GRBL_IN_CONSUMED,
    payload: id,
  };
}
