import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import RpslsGame from './rpslsGame';
import Player from './player';
import generateId from './idGenerator';

export default () => {
  const app = express();

  app.use(express.static('static'));

  const server = http.createServer(app);

  const io = socketio(server);

  const sessions = {}; // storage of game sessions

  io.on('connection', (socket) => {
    const { session } = socket.handshake.query; // read the session id from the websocket client

    // if the session id was sent by the client, and this session exists, start the game
    if (session && sessions[session]) {
      const game = new RpslsGame(sessions[session], new Player(socket));
      game.run();
      delete sessions[session]; // remove the session from the storage after the game starts
    // else create a new session with the player and send him session id for the link generating
    } else {
      const player = new Player(socket);
      const newSession = generateId();
      player.sendSystemMessage('Waiting for an opponent');
      player.sendSessionId(newSession);
      sessions[newSession] = player; // keep the waiting player in the session storage
    }
  });

  return server;
};
