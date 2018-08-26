export default class RpslsGame {
  constructor(p1, p2) {
    this.players = [p1, p2];
    this.turns = [null, null];
    this.finished = false;

    this.win = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['paper', 'spock'],
      spock: ['rock', 'scissors'],
    };

    this.finishMap = [
      {
        message: 'You won!',
        result: 'win',
      },
      {
        message: 'You lost.',
        result: 'lose',
      }
    ];

    this.gameOverMap = [
      {
        check: (p1, p2) => p1 === p2,
        result: () => this.sendDrawMessage(),
      },
      {
        check: (p1, p2) => this.win[p1].includes(p2),
        result: () => this.sendWinMessage(this.players[0], this.players[1]),
      },
      {
        check: (p1, p2) => !this.win[p1].includes(p2),
        result: () => this.sendWinMessage(this.players[1], this.players[0]),
      }
    ];

    this.players.forEach((p, idx) => {
      p.subscribeTo('disconnect', () => this.players[idx ^ 1].onOpponentLeft());
      p.subscribeTo('turn', turn => this.onTurn(idx, turn));
      p.subscribeTo('message', (msg) => this.sendChatMessage(msg));
      p.subscribeTo('reset', () => {
        this.turns[idx] = null
        if (!this.turns[0] && !this.turns[1]) {
          this.resetGame();
        }
      });
      p.startGame(`p${idx + 1}`);
    });

    this.sendToPlayers('Choose your weapon!')
  }

  sendToPlayer(pIdx, msg) {
    this.players[pIdx].sendSystemMessage(msg);
  }

  sendToPlayers(msg) {
    this.players.forEach(p => p.sendSystemMessage(msg));
  }

  sendChatMessage(msg) {
    this.players.forEach(p => p.sendMessage(msg));
  }

  resetGame() {
    this.finished = false;
    this.players.forEach(p => p.resetGame());
    this.sendToPlayers('Next Round!');
  }

  onTurn(pIdx, turn) {
    if (!this.turns[pIdx] && !this.finished) {
      this.turns[pIdx] = turn;
      this.sendTurn(pIdx, turn);
      this.checkGameOver();
    }
  }

  sendTurn(pIdx, turn) {
    this.sendToPlayer(pIdx, `You selected ${turn}`);
    this.players[pIdx].sendTurn(turn);
  }

  sendOpponentsTurns() {
    this.players.forEach((p, idx) => p.sendOpponentsTurn(this.turns[idx ^ 1]));
  }

  checkGameOver() {
    if (this.turns[0] && this.turns[1]) {
      this.getGameResult();
      this.sendOpponentsTurns();
    }
  }

  getGameResult() {
    this.finished = true;
    const p1 = this.turns[0];
    const p2 = this.turns[1];

    this.gameOverMap.find(c => c.check(p1, p2)).result();
  }

  sendDrawMessage() {
    this.sendToPlayers('Draw.');
    this.players.forEach(p => p.finishGame('draw'));
  }

  sendWinMessage(...players) {
    players.forEach((p, idx) => {
      p.sendSystemMessage(this.finishMap[idx].message);
      p.finishGame(this.finishMap[idx].result);
    });
  }
}
