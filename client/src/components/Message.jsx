import React from 'react';

const Message = (props) => {
  const { message: { author, message }, player } = props;

  let realAuthor;
  if (author === 's') {
    realAuthor = 'System';
  } else if (author === player) {
    realAuthor = 'You';
  } else {
    realAuthor = 'Your opponent';
  }

  return (
    <div><b>{realAuthor}:</b> {message}</div>
  );
};

export default Message;
