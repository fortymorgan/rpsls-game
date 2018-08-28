import RpslsGame from '../server/rpslsGame';
import MockPlayer from './__mocks__/player';

// these tests are interdependent and should be executed in order
describe('game instance test', () => {
  const p1 = new MockPlayer();
  const p2 = new MockPlayer();

  const game = new RpslsGame(p1, p2);

  it('should run the game', () => {
    game.run();

    const p1State = {
      messages: [{ author: 's', message: 'Choose your weapon!' }],
      name: 'p1',
      result: '',
      turn: '',
      opponent: '',
      online: true,
    };

    const p2State = {
      messages: [{ author: 's', message: 'Choose your weapon!' }],
      name: 'p2',
      result: '',
      turn: '',
      opponent: '',
      online: true,
    };

    expect(p1.state).toEqual(p1State);
    expect(p2.state).toEqual(p2State);
  });

  it('should add a message from player two', () => {
    const messages = [{ author: 's', message: 'Choose your weapon!' }, { author: 'p2', message: 'Hi there!' }];

    p2.emitEvent('message', { author: 'p2', message: 'Hi there!' });

    expect(p1.state.messages).toEqual(messages);
    expect(p2.state.messages).toEqual(messages);
  });

  it('player one should choose a gesture', () => {
    const gesture = 'rock';

    p1.emitEvent('turn', 'rock');

    expect(p1.state.turn).toEqual(gesture);
  });

  it('player two should choose a gesture', () => {
    const gesture = 'paper';

    p2.emitEvent('turn', 'paper');

    expect(p2.state.turn).toEqual(gesture);
  });

  it('game should be finished', () => {
    const p1State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected rock' },
        { author: 's', message: 'You lost.' },
      ],
      name: 'p1',
      result: 'lose',
      turn: 'rock',
      opponent: 'paper',
      online: true,
    };

    const p2State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected paper' },
        { author: 's', message: 'You won!' },
      ],
      name: 'p2',
      result: 'win',
      turn: 'paper',
      opponent: 'rock',
      online: true,
    };

    expect(p1.state).toEqual(p1State);
    expect(p2.state).toEqual(p2State);
  });

  it('should add a message from player one', () => {
    const p1Messages = [
      { author: 's', message: 'Choose your weapon!' },
      { author: 'p2', message: 'Hi there!' },
      { author: 's', message: 'You selected rock' },
      { author: 's', message: 'You lost.' },
      { author: 'p1', message: 'Mb again?' },
    ];

    const p2Messages = [
      { author: 's', message: 'Choose your weapon!' },
      { author: 'p2', message: 'Hi there!' },
      { author: 's', message: 'You selected paper' },
      { author: 's', message: 'You won!' },
      { author: 'p1', message: 'Mb again?' },
    ];

    p1.emitEvent('message', { author: 'p1', message: 'Mb again?' });

    expect(p1.state.messages).toEqual(p1Messages);
    expect(p2.state.messages).toEqual(p2Messages);
  });

  it('should reset the game', () => {
    const p1State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected rock' },
        { author: 's', message: 'You lost.' },
        { author: 'p1', message: 'Mb again?' },
        { author: 's', message: 'Next Round!' },
      ],
      name: 'p1',
      result: '',
      turn: '',
      opponent: '',
      online: true,
    };

    const p2State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected paper' },
        { author: 's', message: 'You won!' },
        { author: 'p1', message: 'Mb again?' },
        { author: 's', message: 'Next Round!' },
      ],
      name: 'p2',
      result: '',
      turn: '',
      opponent: '',
      online: true,
    };

    p2.emitEvent('reset');
    p1.emitEvent('reset');

    expect(p1.state).toEqual(p1State);
    expect(p2.state).toEqual(p2State);
  });

  it('should be a draw', () => {
    const p1State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected rock' },
        { author: 's', message: 'You lost.' },
        { author: 'p1', message: 'Mb again?' },
        { author: 's', message: 'Next Round!' },
        { author: 's', message: 'You selected spock' },
        { author: 's', message: 'Draw.' },
      ],
      name: 'p1',
      result: 'draw',
      turn: 'spock',
      opponent: 'spock',
      online: true,
    };

    const p2State = {
      messages: [
        { author: 's', message: 'Choose your weapon!' },
        { author: 'p2', message: 'Hi there!' },
        { author: 's', message: 'You selected paper' },
        { author: 's', message: 'You won!' },
        { author: 'p1', message: 'Mb again?' },
        { author: 's', message: 'Next Round!' },
        { author: 's', message: 'You selected spock' },
        { author: 's', message: 'Draw.' },
      ],
      name: 'p2',
      result: 'draw',
      turn: 'spock',
      opponent: 'spock',
      online: true,
    };

    p1.emitEvent('turn', 'spock');
    p2.emitEvent('turn', 'spock');

    expect(p1.state).toEqual(p1State);
    expect(p2.state).toEqual(p2State);
  });

  it('player two should leave', () => {
    p2.emitEvent('disconnect');
    expect(p1.state.online).toEqual(false);
  });
});
