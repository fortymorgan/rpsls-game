import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import RpslsGame from './rpslsGame';

export default () => {
  const app = express();
  
  app.use(express.static('static'));
  
  const server = http.createServer(app);
  
  const io = socketio(server);
  
  const sessions = {};
  
  io.on('connection', (socket) => {
    const { session } = socket.handshake.query;
    socket.emit('player', session ? 'p2' : 'p1');
  
    if (session) {
      new RpslsGame(sessions[session], socket);
    } else {
      socket.emit('message', ({ author: 's', message: 'Waiting for an opponent' }));
      socket.on('session', session => sessions[session] = socket);
    }
  
    socket.on('message', (message) => {
      io.emit('message', message);
    });
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
  });
  
  return server;
};
