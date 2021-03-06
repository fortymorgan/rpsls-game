import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHandLizard,
  faHandPaper,
  faHandRock,
  faHandScissors,
  faHandSpock,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { soundManager } from 'soundmanager2';
import App from './components/App';
import reducers from './reducers';
import * as actions from './actions';
import addSounds from './addSounds';

export default () => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  // add listeners for server websocket events
  actions.socket.on('message', ({ author, message }) => store.dispatch(actions.addMessage(author, message)));
  actions.socket.on('start', player => store.dispatch(actions.gameStart(player)));
  actions.socket.on('reset', () => store.dispatch(actions.gameReset()));
  actions.socket.on('opponent', gesture => store.dispatch(actions.opponentsGesture(gesture)));
  actions.socket.on('finish', result => store.dispatch(actions.setResult(result)));
  actions.socket.on('session', id => store.dispatch(actions.setSession(id)));
  actions.socket.on('turn', turn => store.dispatch(actions.makeChoose(turn)));
  actions.socket.on('left', () => store.dispatch(actions.setOpponentOffline()));


  soundManager.setup({ debugMode: false }); // initialize sound manager with debug mode off
  soundManager.onready(addSounds);

  // add gestures icons to fontawesome library
  library.add(faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock, faQuestion);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
