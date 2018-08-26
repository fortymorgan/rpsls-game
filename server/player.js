export default class Player {
  constructor(socket) {
    this.socket = socket;
  }

  sendSystemMessage(message) {
    this.socket.emit('message', { author: 's', message });
  }

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  startGame(name) {
    this.socket.emit('start', name);
  }

  finishGame(result) {
    this.socket.emit('finish', result);
  }

  resetGame() {
    this.socket.emit('reset');
  }

  sendOpponentsTurn(turn) {
    this.socket.emit('opponent', turn);
  }

  sendSessionId(id) {
    this.socket.emit('session', id);
  }

  sendTurn(turn) {
    this.socket.emit('turn', turn);
  }

  subscribeTo(event, callback) {
    this.socket.on(event, callback);
  }
}
