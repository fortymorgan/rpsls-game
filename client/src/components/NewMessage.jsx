import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class NewMessage extends Component {
  // send chat message to server
  onSend = (values) => {
    const { sendMessage, player, dirty } = this.props;
    if (dirty) {
      sendMessage(values.newMessage, player);
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSend)}>
        <Field
          name="newMessage"
          component="input"
          className="new-message"
          placeholder="New message"
          autoComplete="off"
        />
      </form>
    );
  }
}

const mapStateToProps = ({ player }) => ({ player });

const NewMessageForm = connect(
  mapStateToProps,
  actionCreators,
)(NewMessage);

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
