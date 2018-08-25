import React from 'react';

const Message = (props) => {
  const { message: { author, message }, player } = props;

  const realAuthor = author === 's' ? 'System' : author === player ? 'You' : 'Your opponent';
  return (
    <div><b>{realAuthor}:</b> {message}</div>
  );
};

export default Message;
