import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
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
  actions.socket.on('player', player => store.dispatch(actions.selectPlayer(player)));
  actions.socket.on('start', () => store.dispatch(actions.startGame()));

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
