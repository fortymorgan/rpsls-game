import { createAction } from 'redux-actions';
import { reset } from 'redux-form';

export const socket = io();

export const addMessage = createAction('MESSAGE_ADD', (author, message) => ({ author, message }));
export const toggleRules = createAction('RULES_TOGGLE');
export const selectPlayer = createAction('PLAYER_SELECT');
export const startGame = createAction('GAME_START');
export const chooseGesture = createAction('GESTURE_CHOOSE');

export const sendMessage = (message, author) => (dispatch) => {
  socket.emit('message', { author, message });
  dispatch(reset('newMessage'));
};

export const makeTurn = gesture => (dispatch) => {
  socket.emit('turn', gesture);
  dispatch(chooseGesture(gesture));
};
