import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewMessageForm from './NewMessage';
import Message from './Message';
import * as actionCreators from '../actions';

const mapStateToProps = ({ messages, player }) => ({ messages, player });

class Chat extends Component {
  render() {
    const { messages, player } = this.props;

    return (
      <div className="chat">
        <div className="messages">
          {messages.map((m, idx) => <Message key={idx} message={m} player={player} />)}
        </div>
        <NewMessageForm />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Chat);
