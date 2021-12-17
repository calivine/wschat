const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const moment = require('moment');
const formatMessage = require('./helpers/formatDate');
const {
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers
} = require('./helpers/userHelper');
const registerMessageHandlers = require('./events/MessageHandlers');
const registerRoomHandlers = require('./events/RoomHandlers');

const PORT = 3000 || process.env.PORT

const app = express();

// const server = http.createServer(app);
const server = app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`)
  console.log(moment().format('MMMM Do YYYY hh:mm:ssa'));
});

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

const io = socketio(server);

const onConnection = (socket) => {
  console.log(`${socket.id} connected`);

  registerRoomHandlers(io, socket)
  registerMessageHandlers(io, socket);

}

io.on('connection', onConnection);

/*
io.on('connection', socket => {
  console.log(`${socket.id} connected`);

  registerRoomHandlers(io, socket)
  registerMessageHandlers(io, socket);

  // Listen for client message
  /*
  socket.on('chatMessage', msg => {
    console.log('chat message entered');
    const user = getActiveUser(socket.id);
    // Send the message to room
    io.to(user.room).emit('message', formatMessage(user.username, msg));
    console.log(msg)
  });
   */

  // Runs when client disconnects
  /*
  socket.on('disconnect', () => {
    console.log('disconnecting');
    const user = exitRoom(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage("WebCage", `${user.username} has left the room.`)
      );

      // Current active users and room name
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getIndividualRoomUsers(user.room)
      });
    }
  });
});
   */



