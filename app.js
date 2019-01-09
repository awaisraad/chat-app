const os = require('os');
const http = require('http');
const path = require('path');
const express = require('express');
const redis = require('socket.io-redis');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.adapter(redis({ host: process.env.REDIS_ENDPOINT, port: 6379 }));

io.on('connection', socket => {
  const hostname = os.hostname();
  console.log(`[${ socket.id }] connected on host ${ hostname }`);

  socket.emit('who', hostname);

  socket.on('message', message => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', _ => {
    console.log(`[${ socket.id }] disconnected on host ${ hostname }`);
  })
});

server.listen(3000, function (error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log('application listening on port 3000');
  }
});
