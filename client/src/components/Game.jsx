import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Buttons from './Buttons';
import Field from './Field';
import Intro from './Intro';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const {
    status: {
      waiting,
      online,
    },
    result,
    session,
  } = state;

  return {
    waiting,
    result,
    session,
    online,
  };
};

class Game extends Component {
  render() {
    const {
      waiting,
      result,
      session,
      online,
    } = this.props;

    // generate a class for the game field
    const className = cn({
      game: true,
      'game-started': !waiting,
      win: result === 'win',
      lose: result === 'lose',
      draw: result === 'draw',
    });

    // generate a class for an opponent's status label
    const infoClass = cn({
      info: true,
      online,
      offline: !online,
    });

    const game = (
      <Fragment>
        <Field />
        <Buttons />
      </Fragment>
    );

    return (
      <div className={className}>
        {waiting ? <Intro session={session} /> : game}
        <div className={infoClass}>
          {`Opponent is ${online ? 'online' : 'offline'}`}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Game);
