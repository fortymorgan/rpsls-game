import React, { Component } from 'react';

export default class Intro extends Component {
  // select the link to copy on the input focus
  onSelect = () => {
    this.input.select();
  }

  render() {
    const { session } = this.props;

    const link = `${window.location.origin}#${session}`; // generate a link based on the origin and session id

    return (
      <div className="lock">
        Share this link to start the game
        <input
          className="link"
          onFocus={this.onSelect}
          type="text"
          value={link}
          readOnly
          ref={(input) => { this.input = input; }}
        />
      </div>
    );
  }
}
