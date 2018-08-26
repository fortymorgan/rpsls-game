import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    return [...state, payload];
  },
}, []);

const rules = handleActions({
  [actions.toggleRules](state) {
    return !state;
  },
}, false);

const player = handleActions({
  [actions.startGame](state, { payload }) {
    return payload;
  },
}, '');

const waiting = handleActions({
  [actions.startGame]() {
    return false;
  },
}, true);

const gesture = handleActions({
  [actions.chooseGesture](state, { payload }) {
    return state === '' ? payload : state;
  },
  [actions.resetGesture]() {
    return '';
  },
}, '');

const opponent = handleActions({
  [actions.opponentsGesture](state, { payload }) {
    return state === '' ? payload : state;
  },
  [actions.resetGesture]() {
    return '';
  },
}, '');

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

const session = handleActions({
  [actions.setSession](state, { payload }) {
    return payload;
  },
}, '');

const reset = handleActions({
  [actions.requestReset]() {
    return true;
  },
  [actions.resetGesture]() {
    return false;
  },
}, false);

const online = handleActions({
  [actions.setOpponentOffline]() {
    return false;
  },
  [actions.startGame]() {
    return true;
  },
}, false);

export default combineReducers({
  session,
  messages,
  rules,
  player,
  waiting,
  gesture,
  opponent,
  online,
  result,
  reset,
  form: formReducer,
});
