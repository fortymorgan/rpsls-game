import React, { Component, Fragment } from 'react';
import RulesText from './RulesText';

export default class Rules extends Component {
  state = {
    rules: false,
  }

  // toggle show rules
  onRules = () => {
    const { rules } = this.state;
    this.setState({ rules: !rules });
  }

  render() {
    const { rules } = this.state;
    // generate position of rules window
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
