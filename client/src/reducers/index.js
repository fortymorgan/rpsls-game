import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

// chat messages
const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    return [...state, payload];
  },
}, []);

// players name
const player = handleActions({
  [actions.startGame](state, { payload }) {
    return payload;
  },
}, '');

// game status
const status = handleActions({
  [actions.startGame](state) {
    return { ...state, waiting: false, online: true };
  },
  [actions.requestReset](state) {
    return { ...state, reset: true };
  },
  [actions.chooseGesture](state) {
    return { ...state, finished: true };
  },
  [actions.resetGesture](state) {
    return { ...state, reset: false, finished: false };
  },
  [actions.setOpponentOffline](state) {
    return { ...state, online: false };
  },
}, {
  waiting: true,
  online: false,
  reset: false,
  finished: false,
});

// players gesture
const gesture = handleActions({
  [actions.chooseGesture](state, { payload }) {
    return state === '' ? payload : state;
  },
  [actions.resetGesture]() {
    return '';
  },
}, '');

// opponents gesture
const opponent = handleActions({
  [actions.opponentsGesture](state, { payload }) {
    return state === '' ? payload : state;
  },
  [actions.resetGesture]() {
    return '';
  },
}, '');

// game result
const result = handleActions({
  [actions.getResult](state, { payload }) {
    return payload;
  },
  [actions.chooseGesture]() {
    return 'wait';
  },
  [actions.resetGesture]() {
    return 'none';
  },
}, 'none');

// session id
const session = handleActions({
  [actions.setSession](state, { payload }) {
    return payload;
  },
}, '');

export default combineReducers({
  status,
  session,
  messages,
  player,
  gesture,
  opponent,
  result,
  form: formReducer,
});
