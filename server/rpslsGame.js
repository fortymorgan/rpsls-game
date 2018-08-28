// win conditions for each gesture
const winMap = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors'],
};

// messages map for the winner and the loser
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
    this.players = [p1, p2];
    this.turns = [null, null];

    // map to check the results of the game
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

  // initialize the game
  run() {
    this.players.forEach((p, idx) => {
      // add listeners to events on the websocket client
      p.subscribeTo('disconnect', () => this.players[idx ^ 1].onOpponentLeft());
      p.subscribeTo('turn', turn => this.onTurn(idx, turn));
      p.subscribeTo('message', msg => this.sendChatMessage(msg));
      p.subscribeTo('reset', () => {
        this.turns[idx] = null;
        if (!this.turns[0] && !this.turns[1]) {
          this.resetGame();
        }
      });
      // emit the start event of the game with the players' names
      p.startGame(`p${idx + 1}`);
    });

    this.sendToPlayers('Choose your weapon!');
  }

  // send a system message to the current player in the array
  sendToPlayer(pIdx, msg) {
    this.players[pIdx].sendSystemMessage(msg);
  }

  // send a system message to both players
  sendToPlayers(msg) {
    this.players.forEach(p => p.sendSystemMessage(msg));
  }

  // send player's message to both players
  sendChatMessage(msg) {
    this.players.forEach(p => p.sendMessage(msg));
  }

  // reset game results for the next round
  resetGame() {
    this.players.forEach(p => p.resetGame());
    this.sendToPlayers('Next Round!');
  }

  // write the turn of the player in the array and check the end of the game
  onTurn(pIdx, turn) {
    if (!this.turns[pIdx]) {
      this.turns[pIdx] = turn;
      this.sendTurn(pIdx, turn);
      this.checkGameOver();
    }
  }

  // send a system message with a player's turn
  sendTurn(pIdx, turn) {
    this.sendToPlayer(pIdx, `You selected ${turn}`);
    this.players[pIdx].sendTurn(turn);
  }

  // send a system message with an opponents's turn at the end of the game
  sendOpponentsTurns() {
    this.players.forEach((p, idx) => p.sendOpponentsTurn(this.turns[idx ^ 1]));
  }

  // check if both players made a turn
  checkGameOver() {
    if (this.turns[0] && this.turns[1]) {
      this.getGameResult();
      this.sendOpponentsTurns();
    }
  }

  // check the game results at the end of the game
  getGameResult() {
    const p1 = this.turns[0];
    const p2 = this.turns[1];

    this.gameOverMap.find(c => c.check(p1, p2)).result();
  }

  // send a system message and a result in a draw
  sendDrawMessage() {
    this.sendToPlayers('Draw.');
    this.players.forEach(p => p.finishGame('draw'));
  }

  // send a system message and a result to the winner and the loser
  sendWinMessage(...players) {
    players.forEach((p, idx) => {
      this.players[p].sendSystemMessage(finishMap[idx].message);
      this.players[p].finishGame(finishMap[idx].result);
    });
  }
}
