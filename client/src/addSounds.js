import '../../sounds/win.wav';
import '../../sounds/lose.wav';
import '../../sounds/draw.wav';
import '../../sounds/start.wav';
import '../../sounds/choose.wav';

export default () => {
  const sounds = [
    {
      id: 'choose',
      url: 'sounds/choose.wav',
    },
    {
      id: 'win',
      url: 'sounds/win.wav',
    },
    {
      id: 'lose',
      url: 'sounds/lose.wav',
    },
    {
      id: 'draw',
      url: 'sounds/draw.wav',
    },
    {
      id: 'start',
      url: 'sounds/start.wav',
    }
  ];

  sounds.forEach(s => soundManager.createSound(s));
};
