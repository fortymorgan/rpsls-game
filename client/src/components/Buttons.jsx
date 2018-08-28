import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import * as actionCreators from '../actions';

const Button = (props) => {
  const { gesture, onTurn, selected } = props;

  // generate class for gestures buttons
  const className = cn({
    button: true,
    gesture: true,
    selected,
  });

  return (
    // add react transition animation on buttons render
    <ReactCSSTransitionGroup
      transitionName={`gesture-${gesture}`}
      transitionAppear={true}
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={1000}
    >
      <div className={className} id={gesture} onClick={onTurn}>
        {/* choose a gesture icon basing on prop */}
        <FontAwesomeIcon icon={`hand-${gesture}`} size="5x" />
      </div>
    </ReactCSSTransitionGroup>
  );
};

const mapStateToProps = ({ gesture, status: { finished } }) => ({ gesture, finished });

class Buttons extends Component {
  // handler for button on players turn
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
        {['rock', 'paper', 'scissors', 'lizard', 'spock'] // array of gestures
          .map(g => <Button
            key={g}
            gesture={g}
            onTurn={this.onTurn(g)}
            selected={gesture === g}
          />)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Buttons);
