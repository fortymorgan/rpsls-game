import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import RpslsGame from './rpslsGame';

const app = express();

app.use(express.static('dist'));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer;

io.on('connection', (socket) => {
  socket.emit('player', waitingPlayer ? 'p2' : 'p1');

  if (waitingPlayer) {
    new RpslsGame(waitingPlayer, socket);
    waitingPlayer = null;
  } else {
    socket.emit('message', ({ author: 's', message: 'Waiting for an opponent' }));
    socket.on('disconnect', () => waitingPlayer = null);
    waitingPlayer = socket;
  }

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

export default server;
