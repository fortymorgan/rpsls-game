import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import * as actionCreators from '../actions';

const Gesture = (props) => {
  const { gesture } = props;

  return (
    <ReactCSSTransitionGroup
      transitionName={'choose'}
      transitionAppear={true}
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={500}
    >
      <div className="gesture">
        <FontAwesomeIcon icon={gesture === '' ? 'question' : `hand-${gesture}`} size="5x" />
      </div>
    </ReactCSSTransitionGroup>
  );
};

const mapStateToProps = (state) => {
  const {
    gesture,
    result,
    opponent,
    status: { reset },
  } = state;

  return {
    gesture,
    result,
    opponent,
    reset,
  };
};

class Field extends Component {
  render() {
    const {
      gesture,
      opponent,
      nextRound,
      result,
      reset,
    } = this.props;

    const disabled = !opponent || !gesture || reset;

    const nextRClass = cn({
      reset: true,
      disabled,
    });

    const headerMap = {
      none: 'Choose your weapon!',
      wait: 'Waiting for an opponent.',
      win: 'You won!',
      lose: 'You lost.',
      draw: 'Draw.',
    };

    return (
      <div className="field">
        <div className="field-header">{headerMap[result]}</div>
        <div className="field-body">
          <Gesture gesture={gesture} />
          <div className="versus">VS</div>
          <Gesture gesture={opponent} />
        </div>
        <div className="field-footer">
          <button className={nextRClass} disabled={disabled} onClick={nextRound}>
            {reset ? 'Waiting for an opponent' : 'Next round'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Field);
