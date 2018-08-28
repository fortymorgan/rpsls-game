import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import RpslsGame from './rpslsGame';
import Player from './player';
import generateId from './idGenerator';

export default () => {
  const app = express(); // initialize express app

  app.use(express.static('static')); // add serving static files

  const server = http.createServer(app); // create server with express

  const io = socketio(server); // create websocket on server side

  const sessions = {}; // storage for game sessions
  // on client websocket connection decide to generate session or to start the game
  io.on('connection', (socket) => {
    const { session } = socket.handshake.query; // reading session id from websocket client
    // if the session id was sent by the client and this session exists start the game
    if (session && sessions[session]) {
      const game = new RpslsGame(sessions[session], new Player(socket)); // create game instance
      game.run(); // initialize the game
      delete sessions[session]; // clear session from storage after game start
    // else create new session with waiting player and send him session id for link generating
    } else {
      const player = new Player(socket); // creaye player instance
      const newSession = generateId(); // generating session id
      player.sendSystemMessage('Waiting for an opponent'); // send system message to waiting player
      player.sendSessionId(newSession); // send session id to waiting player
      sessions[newSession] = player; // save waiting player to session storage
    }
  });

  return server;
};
