import React from 'react';

const Intro = (props) => {
  const { session } = props;
  return (
    <div className="lock">
      Share this link to start the game
      <input
        className="link"
        onFocus={() => document.querySelector('.link').select()}
        type="text"
        value={`${window.location.origin}#${session}`}
        readOnly
      />
    </div>
  );
};

export default Intro;
