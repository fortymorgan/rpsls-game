import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock, faQuestion } from '@fortawesome/free-solid-svg-icons'
import App from './components/App';
import reducers from './reducers';
import generateId from './idGenerator';
import * as actions from './actions';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  actions.socket.on('message', ({ author, message }) => store.dispatch(actions.addMessage(author, message)));
  actions.socket.on('player', player => store.dispatch(actions.selectPlayer(player)));
  actions.socket.on('start', () => store.dispatch(actions.startGame()));
  actions.socket.on('reset', () => store.dispatch(actions.resetGesture()));
  actions.socket.on('opponent', gesture => store.dispatch(actions.opponentsGesture(gesture)));
  actions.socket.on('finish', result => store.dispatch(actions.getResult(result)));

  if (!window.location.hash) {
    const id = generateId();
    store.dispatch(actions.setSession(id));
    actions.socket.emit('session', id);
  }

  library.add(faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock, faQuestion);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
