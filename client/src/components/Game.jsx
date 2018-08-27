import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Buttons from './Buttons';
import Field from './Field';
import Intro from './Intro';
import * as actionCreators from '../actions';

const mapStateToProps = ({
  waiting,
  result,
  session,
  online,
}) => ({
  waiting,
  result,
  session,
  online,
});

class Game extends Component {
  render() {
    const {
      waiting,
      result,
      session,
      online,
    } = this.props;

    const className = cn({
      game: true,
      'game-started': !waiting,
      win: result === 'win',
      lose: result === 'lose',
      draw: result === 'draw',
    });

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
