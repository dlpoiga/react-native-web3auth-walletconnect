import React from 'react';

export const Store = React.createContext();

const initialState = {
  loading: true,
  opacity: 1,
  user: null,
  accounts: [],
  navigation: {
    navigate: () => {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STORE':
      return {...state, [action.label]: action.payload};
    case 'RESET_DATA':
      return {...initialState};
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
