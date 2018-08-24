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
  [actions.selectPlayer](state, { payload }) {
    return payload;
  },
}, '');

const waiting = handleActions({
  [actions.startGame]() {
    return false;
  },
}, true);

export default combineReducers({
  messages,
  rules,
  player,
  waiting,
  form: formReducer,
});
