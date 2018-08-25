import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Buttons from './Buttons';
import Field from './Field';
import Intro from './Intro';
import * as actionCreators from '../actions';

const mapStateToProps = ({ waiting, result, session }) => ({ waiting, result, session });

class Game extends Component {
  render() {
    const { waiting, result, session } = this.props;

    const className = cn({
      game: true,
      'game-started': !waiting,
      win: result === 'win',
      lose: result === 'lose',
    });

    const game = (
      <Fragment>
        <Field />
        <Buttons />
      </Fragment>
    )

    return (
      <div className={className}>
        {waiting ? <Intro session={session} /> : game}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Game);
