import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ waiting }) => ({ waiting });

class Game extends Component {
  render() {
    const { waiting } = this.props;

    return (
      <div className="game">
        {waiting ? <div>Waiting for an opponent</div> : <div></div>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Game);
