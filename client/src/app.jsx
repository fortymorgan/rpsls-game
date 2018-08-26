import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock, faQuestion } from '@fortawesome/free-solid-svg-icons'
import App from './components/App';
import reducers from './reducers';
import * as actions from './actions';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  actions.socket.on('message', ({ author, message }) => store.dispatch(actions.addMessage(author, message)));
  actions.socket.on('start', player => store.dispatch(actions.startGame(player)));
  actions.socket.on('reset', () => store.dispatch(actions.resetGesture()));
  actions.socket.on('opponent', gesture => store.dispatch(actions.opponentsGesture(gesture)));
  actions.socket.on('finish', result => store.dispatch(actions.getResult(result)));
  actions.socket.on('session', id => store.dispatch(actions.setSession(id)));
  actions.socket.on('turn', turn => store.dispatch(actions.chooseGesture(turn)));
  actions.socket.on('left', () => store.dispatch(actions.setOpponentOffline()))

  library.add(faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock, faQuestion);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
