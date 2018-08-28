export default class MockPlayer {
  constructor() {
    this.state = {
      messages: [],
      name: '',
      result: '',
      turn: '',
      opponent: '',
      online: false,
    };
    this.subscriptions = {};
  }

  sendSystemMessage(message) {
    const { messages } = this.state;
    this.state.messages = [...messages, { author: 's', message }];
  }

  sendMessage(message) {
    const { messages } = this.state;
    this.state.messages = [...messages, message];
  }

  startGame(name) {
    this.state.name = name;
    this.state.online = true;
  }

  finishGame(result) {
    this.state.result = result;
  }

  resetGame() {
    this.state.result = '';
    this.state.turn = '';
    this.state.opponent = '';
  }

  sendOpponentsTurn(turn) {
    this.state.opponent = turn;
  }

  sendTurn(turn) {
    this.state.turn = turn;
  }

  onOpponentLeft() {
    this.state.online = false;
  }

  subscribeTo(event, callback) {
    this.subscriptions = { ...this.subscriptions, [event]: callback };
  }

  emitEvent(event, arg) {
    this.subscriptions[event](arg);
  }
}
