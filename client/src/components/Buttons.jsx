import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import * as actionCreators from '../actions';

const Button = (props) => {
  const { gesture, onTurn, selected } = props;

  const className = cn({
    button: true,
    gesture: true,
    selected,
  });

  return (
    <div className={className} id={gesture} onClick={onTurn}>
      <FontAwesomeIcon icon={`hand-${gesture}`} size="5x" />
    </div>
  );
};

const mapStateToProps = ({ gesture, status: { finished } }) => ({ gesture, finished });

class Buttons extends Component {
  onTurn = gesture => () => {
    const { makeTurn, finished } = this.props;
    if (!finished) {
      makeTurn(gesture);
    }
  }

  render() {
    const { gesture } = this.props;

    return (
      <div className="buttons">
        {['rock', 'paper', 'scissors', 'lizard', 'spock']
          .map(g => <Button key={g} gesture={g} onTurn={this.onTurn(g)} selected={gesture === g} />)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Buttons);
