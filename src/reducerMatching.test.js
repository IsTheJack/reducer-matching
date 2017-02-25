import reducerMatching from './reducerMatching';

const initialState = {
  count: 0,
  mock: 'mocked'
};

const types = {
  INC: 'INC',
  DEC: 'DEC',
  CHANGE_MOCK: 'CHANGE_MOCK',
};

const actions = {
  inc() { return { type: types.INC } },
  dec() { return { type: types.DEC } },
  changeMock(value) { return { type: types.CHANGE_MOCK, payload: value } },
}

const reducers = {
  inc(state, action) {
    return { ...state, count: state.count + 1 };
  },
  changeMock(state, action) {
    return { ...state, mock: action.payload };
  }
};

const reducer = reducerMatching(
  [ types.INC,          reducers.inc         ],
  [ types.CHANGE_MOCK,  reducers.changeMock  ]
);

describe('reducerMatching', () => {
  it('Must return default state if no match', () => {
    const newState = reducer(initialState, actions.dec());
    expect(newState).toEqual(initialState);
  });

  it('Must match and return the new state', () => {
    const expectedState = {
      count: 1,
      mock: 'mocked'
    };
    const newState = reducer(initialState, actions.inc());
    expect(newState).toEqual(expectedState);
  });

  it('Must match with and use payload of the action', () => {
    const expectedState = {
      count: 0,
      mock: 'Xabablau!'
    };
    const newState = reducer(initialState, actions.changeMock('Xabablau!'));
    expect(newState).toEqual(expectedState);
  });
});
