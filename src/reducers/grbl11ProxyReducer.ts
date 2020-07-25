import hostInReducer, {
  initialState as initialHostIn, HostInState, HostInAction,
  hostIn, hostInBlockConsumed, hostInRtcConsumed
} from './hostInReducer';
import hostOutReducer, {
  initialState as initialHostOut, HostOutState, HostOutAction,
  hostOutSend, hostOutBufferConsumed 
} from './hostOutReducer';
import grblInReducer, { 
  initialState as initialGrblIn, GrblInState, GrblInAction,
  grblInAddBuffer, grblInConsumed 
} from './grblInReducer';
import grblOutReducer, {
  initialState as initialGrblOut, GrblOutState, GrblOutAction,
  grblOutSend, grblOutBufferConsumed
} from './grblOutReducer';

import inOutReducer, { InOutState } from './inOutReducer';
import GrblResponseParser from '../grbl11/GrblResponseParser';
import { GrblResponse } from '../grbl11/responses';
import { realtimeCommands } from '../grbl11/requests';

const responseParser = new GrblResponseParser();

const grblReducer = inOutReducer(initialGrblIn, initialGrblOut, grblInReducer(responseParser), grblOutReducer);

const hostReducer = inOutReducer(
  initialHostIn,
  initialHostOut,
  hostInReducer(realtimeCommands),
  hostOutReducer(responseParser),
);

type HostAction = HostInAction | HostOutAction<GrblResponse>;
type GrblAction = GrblInAction | GrblOutAction;

export type ProxyAction = HostAction | GrblAction;

interface GrblState {
  host: InOutState<HostInState, HostOutState>;
  grbl: InOutState<GrblInState<GrblResponse>, GrblOutState>;
}

export const initialState: GrblState = {
  host: {
    in: initialHostIn,
    out: initialHostOut,
  },
  grbl: {
    in: initialGrblIn,
    out: initialGrblOut,
  },
};

export default function (state = initialState, action: ProxyAction): GrblState {
  let ret = state;

  if (action.type.startsWith('jhonny-grbl/host')) {
    const hostAction = action as HostAction;
    ret = {
      ...state,
      host: hostReducer(state.host, hostAction),
    };
  } else if (action.type.startsWith('jhonny-grbl/grbl')) {
    const grblAction = action as GrblAction;
    ret = {
      ...state,
      grbl: grblReducer(state.grbl, grblAction),
    };
  }
  return ret;
}

export const actions={
  host:{
    in:{
      hostIn, hostInBlockConsumed, hostInRtcConsumed
    },
    out:{
      hostOutSend, hostOutBufferConsumed 
    }
  },
  grbl:{
    in:{
      grblInAddBuffer, grblInConsumed 
    },
    out:{
      grblOutSend, grblOutBufferConsumed
    }
  }
}