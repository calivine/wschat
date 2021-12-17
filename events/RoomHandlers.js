const {newUser, getIndividualRoomUsers, exitRoom} = require("../helpers/userHelper");
const formatMessage = require("../helpers/formatDate");
module.exports = (io, socket) => {
  const joinRoom = ({username, room}) => {
    console.log('joined room');
    const user = newUser(socket.id, username, room);
    socket.join(user.room);

    // General Welcome
    socket.emit('message', formatMessage("WebCage", `Welcome ${user.username}`));

    socket.broadcast.to(user.room).emit('message', formatMessage("WebCage", `${user.username} has joined the room.`));
    console.log(user.username);
    // Current active users and room name

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getIndividualRoomUsers(user.room)
    });

  }

  const disconnect = () => {
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
  }

  socket.on('joinRoom', joinRoom);
  socket.on('disconnect', disconnect)
}