import { createAction } from 'redux-actions';
import { reset } from 'redux-form';
import io from 'socket.io-client';

export const socket = io();

export const addMessage = createAction('MESSAGE_ADD', (author, message) => ({ author, message }));
export const toggleRules = createAction('RULES_TOGGLE');
export const selectPlayer = createAction('PLAYER_SELECT');
export const startGame = createAction('GAME_START');
export const chooseGesture = createAction('GESTURE_CHOOSE');
export const resetGesture = createAction('GESTURE_RESET');
export const opponentsGesture = createAction('GESTURE_OPPONENT');
export const getResult = createAction('RESULT_GET');

export const sendMessage = (message, author) => (dispatch) => {
  socket.emit('message', { author, message });
  dispatch(reset('newMessage'));
};

export const makeTurn = gesture => (dispatch) => {
  socket.emit('turn', gesture);
  dispatch(chooseGesture(gesture));
};

export const nextRound = () => () => {
  socket.emit('reset');
};
