export default class RpslsGame {
  constructor(p1, p2) {
    this.players = [p1, p2];
    this.turns = [null, null];

    this.map = {
      rock: {
        win: ['scissors', 'lizard'],
      },
      paper: {
        win: ['rock', 'spock'],
      },
      scissors: {
        win: ['paper', 'lizard'],
      },
      lizard: {
        win: ['paper', 'spock'],
      },
      spock: {
        win: ['rock', 'scissors'],
      },
    };

    this.players.forEach((player, idx) => {
      player.on('turn', (turn) => {
        this.onTurn(idx, turn);
      });
    });
    this.sendToPlayers('Choose your weapon!')
  }

  sendToPlayer(playerIndex, message) {
    this.players[playerIndex].emit('message', { author: 'System', message });
  }

  sendToPlayers(message) {
    this.players.forEach((player) => {
      player.emit('message',  { author: 'System', message });
    });
  }

  onTurn(playerIndex, turn) {
    if (!this.turns[playerIndex]) {
      this.turns[playerIndex] = turn;
      this.sendToPlayer(playerIndex, `You selected ${turn}`);
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (this.turns[0] && this.turns[1]) {
      this.getGameResult();
      this.turns = [null, null];
      this.sendToPlayers('Next Round!');
    }
  }

  getGameResult() {
    const p1 = this.turns[0];
    const p2 = this.turns[1];

    if (p1 === p2) {
      this.sendToPlayers('Draw!');
    } else if (this.map[p1].win.includes(p2)) {
      this.sendWinMessage(this.players[0], this.players[1]);
    } else {
      this.sendWinMessage(this.players[1], this.players[0]);
    }
  }

  sendWinMessage(winner, loser) {
    winner.emit('message', 'You won!');
    loser.emit('message', 'You lost.');
  }
}
