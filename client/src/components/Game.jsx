import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Buttons from './Buttons';
import Field from './Field';
import * as actionCreators from '../actions';

const mapStateToProps = ({ waiting, result }) => ({ waiting, result });

class Game extends Component {
  render() {
    const { waiting, result } = this.props;

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
        {waiting ? <div className="lock">Waiting for an opponent</div> : game}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Game);
