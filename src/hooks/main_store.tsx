import React from 'react';

interface initialStateProps {
  loading: boolean;
  opacity: number;
  user: object | null;
  selectedWallet: number;
  navigation: {
    navigate: Function;
  };
}

const initialState: initialStateProps = {
  loading: true,
  opacity: 1,
  user: null,
  selectedWallet: 0,
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

export const Store = React.createContext();

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
