import { soundManager } from 'soundmanager2';
import win from '../../sounds/win.wav';
import lose from '../../sounds/lose.wav';
import draw from '../../sounds/draw.wav';
import start from '../../sounds/start.wav';
import choose from '../../sounds/choose.wav';

export default () => {
  const sounds = [
    {
      id: 'choose',
      url: choose,
    },
    {
      id: 'win',
      url: win,
    },
    {
      id: 'lose',
      url: lose,
    },
    {
      id: 'draw',
      url: draw,
    },
    {
      id: 'start',
      url: start,
    }
  ];

  sounds.forEach(s => soundManager.createSound(s));
};
