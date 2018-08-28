// win conditions for every gesture
const winMap = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors'],
};

// messages map for winner and loser
const finishMap = [
  {
    message: 'You won!',
    result: 'win',
  },
  {
    message: 'You lost.',
    result: 'lose',
  },
];

export default class RpslsGame {
  constructor(p1, p2) {
    this.players = [p1, p2]; // array with the players instances
    this.turns = [null, null]; // array with the players turns

    // map for checking game results
    this.gameOverMap = [
      {
        check: (player1, player2) => player1 === player2,
        result: () => this.sendDrawMessage(),
      },
      {
        check: (player1, player2) => winMap[player1].includes(player2),
        result: () => this.sendWinMessage(0, 1),
      },
      {
        check: (player1, player2) => !winMap[player1].includes(player2),
        result: () => this.sendWinMessage(1, 0),
      },
    ];
  }

  // initialize game
  run() {
    this.players.forEach((p, idx) => {
      // add listeners for clents websocket events
      p.subscribeTo('disconnect', () => this.players[idx ^ 1].onOpponentLeft());
      p.subscribeTo('turn', turn => this.onTurn(idx, turn));
      p.subscribeTo('message', msg => this.sendChatMessage(msg));
      p.subscribeTo('reset', () => {
        this.turns[idx] = null;
        if (!this.turns[0] && !this.turns[1]) {
          this.resetGame();
        }
      });
      // emit start game event with players names
      p.startGame(`p${idx + 1}`);
    });

    this.sendToPlayers('Choose your weapon!');
  }

  // send sytem message for current player in array
  sendToPlayer(pIdx, msg) {
    this.players[pIdx].sendSystemMessage(msg);
  }

  // send sytem message for both players
  sendToPlayers(msg) {
    this.players.forEach(p => p.sendSystemMessage(msg));
  }

  // send players messages to both players
  sendChatMessage(msg) {
    this.players.forEach(p => p.sendMessage(msg));
  }

  // reset game results for next round
  resetGame() {
    this.players.forEach(p => p.resetGame());
    this.sendToPlayers('Next Round!');
  }

  // write players turns to an array and checking for game over
  onTurn(pIdx, turn) {
    if (!this.turns[pIdx]) {
      this.turns[pIdx] = turn;
      this.sendTurn(pIdx, turn);
      this.checkGameOver();
    }
  }

  // send system message with players turn
  sendTurn(pIdx, turn) {
    this.sendToPlayer(pIdx, `You selected ${turn}`);
    this.players[pIdx].sendTurn(turn);
  }

  // send system message with opponents turn on game over
  sendOpponentsTurns() {
    this.players.forEach((p, idx) => p.sendOpponentsTurn(this.turns[idx ^ 1]));
  }

  // check if both players made turns
  checkGameOver() {
    if (this.turns[0] && this.turns[1]) {
      this.getGameResult();
      this.sendOpponentsTurns();
    }
  }

  // check game results on game over
  getGameResult() {
    const p1 = this.turns[0];
    const p2 = this.turns[1];

    this.gameOverMap.find(c => c.check(p1, p2)).result();
  }

  // send system message and result on draw
  sendDrawMessage() {
    this.sendToPlayers('Draw.');
    this.players.forEach(p => p.finishGame('draw'));
  }

  // send system message and result to winner and loser
  sendWinMessage(...players) {
    players.forEach((p, idx) => {
      this.players[p].sendSystemMessage(finishMap[idx].message);
      this.players[p].finishGame(finishMap[idx].result);
    });
  }
}
