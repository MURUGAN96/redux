import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';

import './style.css';

export default function App() {
  //Actions
  const GET_CAKE = 'GET_CAKE';
  const FILL_CAKE = 'FILL_CAKE';
  const FILL_ICE = 'FILL_ICE';
  const logger = createLogger();
  const middleWare = [logger];

  //Action reducers
  function orderCake() {
    return {
      type: GET_CAKE,
      quantity: 1,
    };
  }

  function fillCake(qty = 2) {
    return {
      type: FILL_CAKE,
      quantity: qty,
    };
  }

  function fillIceCream(qty = 2) {
    return {
      type: FILL_ICE,
      payload: qty,
    };
  }

  //global store

  const cakeState = {
    numberOfCakes: 10,
  };

  //Reducers

  const cakeReducer = (state = cakeState, action) => {
    const { type, quantity } = action;

    switch (type) {
      case GET_CAKE:
        return {
          ...state,
          numberOfCakes: state.numberOfCakes - 1,
        };
      case FILL_CAKE:
        return {
          ...state,
          numberOfCakes: state.numberOfCakes + quantity,
        };
      default:
        return state;
    }
  };

  const iceState = {
    numberOfIce: 10,
  };

  const iceReducer = (state = iceState, action) => {
    const { type, payload } = action;

    switch (type) {
      case 'FILL_ICE':
        return {
          ...state,
          numberOfIce: state.numberOfIce + payload,
        };
      default:
        return state;
    }
  };

  //configure store

  const reducers = combineReducers({
    cake: cakeReducer,
    ice: iceReducer,
  });

  const store = createStore(reducers, applyMiddleware(...middleWare));
  const unsubscribe = store.subscribe(() => console.log(store.getState()));
  store.dispatch(orderCake());
  store.dispatch(orderCake());
  store.dispatch(orderCake());
  store.dispatch(fillCake(4));
  store.dispatch(fillIceCream(5));
  unsubscribe();

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
