import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Buttons from './Buttons';
import * as actionCreators from '../actions';

const mapStateToProps = ({ waiting }) => ({ waiting });

class Game extends Component {
  render() {
    const { waiting } = this.props;

    const className = cn({
      game: true,
      'game-started': !waiting,
    });

    return (
      <div className={className}>
        {waiting ? <div className="lock">Waiting for an opponent</div> : <Buttons />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Game);
