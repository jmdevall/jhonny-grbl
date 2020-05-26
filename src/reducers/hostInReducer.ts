import bufferRequestParse, {
  RequestBlockMessage,
  RequestRtcMessage,
  BufferRequestParseResult,
  DictionaryRtc,
} from '../parsers/bufferRequestParse';

const HOST_IN_ADD_BUFFER = 'jhonny-grbl/host/in/HOST_IN_ADD_BUFFER';
const HOST_IN_BLOCK_CONSUMED = 'jhonny-grbl/host/in/HOST_IN_BLOCK_CONSUMED';
const HOST_IN_RTC_CONSUMED = 'jhonny-grbl/host/in/HOST_IN_RTC_CONSUMED';

export interface HostInState {
  buffer: Buffer;
  blocks: RequestBlockMessage[];
  rtcs: RequestRtcMessage[];
  lastId: number;
}

export const initialState = {
  buffer: Buffer.from([]),
  blocks: [],
  rtcs: [],
  lastId: 0,
};

const reducer = (realtimeCommands: DictionaryRtc) => (state: HostInState = initialState, action: HostInActionTypes) => {
  switch (action.type) {
    case HOST_IN_ADD_BUFFER:
      const realAction = action as HostInAction;
      let newBuffer = Buffer.concat([state.buffer, realAction.payload]);

      const newBlocks = new Array<RequestBlockMessage>();
      const newRtcs = new Array<RequestRtcMessage>();
      let newId = state.lastId;

      let parseado: BufferRequestParseResult = bufferRequestParse(newBuffer, realtimeCommands);
      newBuffer = parseado.newBuffer;

      while (parseado.message !== undefined) {
        if (parseado.message.type === 'block') {
          const requestBlockMessage = parseado.message as RequestBlockMessage;

          newId++;
          newBlocks.push({
            id: newId,
            type: 'block',
            payload: requestBlockMessage.payload,
          });
        } else if (parseado.message.type === 'rtc') {
          const requestRtcMessage = parseado.message as RequestRtcMessage;
          newId++;
          newRtcs.push({
            id: newId,
            type: 'rtc',
            payload: requestRtcMessage.payload,
          });
        } else {
          throw Error('hostInReducer message.type not found: ' + parseado.message.type);
        }
        parseado = bufferRequestParse(newBuffer, realtimeCommands);

        newBuffer = parseado.newBuffer;
      }

      return {
        ...state,
        buffer: newBuffer,
        blocks: [...state.blocks, ...newBlocks],
        rtcs: [...state.rtcs, ...newRtcs],
        lastId: newId,
      };

    case HOST_IN_BLOCK_CONSUMED:
      const hostInBlockConsumedAction = action as HostInConsumedAction;
      return {
        ...state,
        blocks: state.blocks.filter((block: RequestBlockMessage) => {
          return block.id !== hostInBlockConsumedAction.payload;
        }),
      };

    case HOST_IN_RTC_CONSUMED:
      const hostInRtcConsumedAction = action as HostInConsumedAction;

      return {
        ...state,
        rtcs: state.rtcs.filter((rtc: RequestRtcMessage) => {
          return rtc.id !== hostInRtcConsumedAction.payload;
        }),
      };
    default:
      return state;
  }
};
export default reducer;

export interface HostInAction {
  type: string;
  payload: Buffer;
}

export interface HostInConsumedAction {
  type: string;
  payload: number;
}

export type HostInActionTypes = HostInAction | HostInConsumedAction;

export function hostIn(data: Buffer): HostInAction {
  return {
    type: HOST_IN_ADD_BUFFER,
    payload: data,
  };
}

export function hostInBlockConsumed(id: number): HostInConsumedAction {
  return {
    type: HOST_IN_BLOCK_CONSUMED,
    payload: id,
  };
}

export function hostInRtcConsumed(id: number): HostInConsumedAction {
  return {
    type: HOST_IN_RTC_CONSUMED,
    payload: id,
  };
}
