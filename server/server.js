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
  
  const sessions = {};
  
  io.on('connection', (socket) => {
    const { session } = socket.handshake.query;
  
    if (session && sessions[session]) {
      const game = new RpslsGame(sessions[session], new Player(socket));
      game.run();
      delete sessions[session];
    } else {
      const player = new Player(socket);
      const newSession = generateId();
      player.sendSystemMessage('Waiting for an opponent');
      player.sendSessionId(newSession);
      sessions[newSession] = player;
    }
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
  });
  
  return server;
};
