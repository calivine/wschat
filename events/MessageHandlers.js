const {getActiveUser} = require("../helpers/userHelper");
const formatMessage = require("../helpers/formatDate");
module.exports = (io, socket) => {

  const chatMessage = (msg) => {
    console.log('chat message entered');
    const user = getActiveUser(socket.id);
    // Send the message to room
    io.to(user.room).emit('message', formatMessage(user.username, msg));
    console.log(msg)
  }

  socket.on('chatMessage', chatMessage);
}