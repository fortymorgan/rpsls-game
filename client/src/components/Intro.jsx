import React, { Component } from 'react';

export default class Intro extends Component {
  onSelect = () => {
    this.input.select();
  }

  render() {
    const { session } = this.props;
    return (
      <div className="lock">
        Share this link to start the game
        <input
          className="link"
          onFocus={this.onSelect}
          type="text"
          value={`${window.location.origin}#${session}`}
          readOnly
          ref={(input) => { this.input = input; }}
        />
      </div>
    );
  }
}
