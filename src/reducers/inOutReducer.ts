export interface InOutState<InState, OutState> {
  in: InState;
  out: OutState;
}

const reducer = <InState, OutState, ActionTypeIn, ActionTypeOut>(
  initialInState: InState,
  initialOutState: OutState,
  inReducer: (state: InState, action: ActionTypeIn) => InState,
  outReducer: (state: OutState, action: ActionTypeOut) => OutState,
) => (
  state = {
    in: initialInState,
    out: initialOutState,
  },
  action: ActionTypeIn | ActionTypeOut,
): InOutState<InState, OutState> => {
  return {
    in: inReducer(state.in, action as ActionTypeIn),
    out: outReducer(state.out, action as ActionTypeOut),
  };
};

export default reducer;
