import React, { Component, Fragment } from 'react';
import Header from './Header';
import Game from './Game';
import Chat from './Chat';

export default class App extends Component {
  render() {
    const { session } = this.props;
    return (
      <Fragment>
        <Header />
        <Game />
        <Chat />
      </Fragment>
    );
  }
};
