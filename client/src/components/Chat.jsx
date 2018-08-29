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
        <div className="messages" ref={(div) => { this.chat = div; }}>
          {messages.map((m, idx) => <Message key={idx} message={m} player={player} />)}
        </div>
        <NewMessageForm />
      </div>
    );
  }

  componentDidUpdate() {
    const scrollTop = this.chat.scrollHeight - this.chat.offsetHeight;
    if (scrollTop > 0) {
      this.chat.scrollTop = scrollTop;
    }
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Chat);
