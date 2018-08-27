import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import RulesText from './RulesText';

const mapStateToProps = ({ rules }) => ({ rules });

class Rules extends Component {
  onRules = () => {
    const { toggleRules } = this.props;
    toggleRules();
  }

  render() {
    const { rules } = this.props;
    const rulesStyle = {
      top: rules ? '8%' : '-500px',
    };

    return (
      <Fragment>
        <div className="rules-button" onClick={this.onRules}>Game rules</div>
        <div className="rules" style={rulesStyle}>
          <RulesText />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Rules);
