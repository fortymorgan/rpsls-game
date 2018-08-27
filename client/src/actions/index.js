import { createAction } from 'redux-actions';
import { reset } from 'redux-form';
import io from 'socket.io-client';
import { soundManager } from 'soundmanager2';

export const socket = io(`${window.location.origin}?session=${window.location.hash.slice(1)}`);

export const addMessage = createAction('MESSAGE_ADD', (author, message) => ({ author, message }));
export const startGame = createAction('GAME_START');
export const chooseGesture = createAction('GESTURE_CHOOSE');
export const resetGesture = createAction('GESTURE_RESET');
export const opponentsGesture = createAction('GESTURE_OPPONENT');
export const getResult = createAction('RESULT_GET');
export const setSession = createAction('SESSION_SET');
export const requestReset = createAction('RESET_REQUEST');
export const setOpponentOffline = createAction('OPPONENT_OFLINE');

export const sendMessage = (message, author) => (dispatch) => {
  socket.emit('message', { author, message });
  dispatch(reset('newMessage'));
};

export const makeTurn = gesture => () => {
  socket.emit('turn', gesture);
};

export const nextRound = () => (dispatch) => {
  socket.emit('reset');
  dispatch(requestReset());
};

export const makeChoose = gesture => (dispatch) => {
  dispatch(chooseGesture(gesture));
  soundManager.play('choose');
};

export const setResult = result => (dispatch) => {
  dispatch(getResult(result));
  setTimeout(() => soundManager.play(result), 500);
};

export const gameStart = player => (dispatch) => {
  dispatch(startGame(player));
  soundManager.play('start');
};

export const gameReset = () => (dispatch) => {
  dispatch(resetGesture());
  soundManager.play('start');
};
