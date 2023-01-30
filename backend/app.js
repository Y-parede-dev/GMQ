const { Socket } = require('socket.io');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const normalizePort = (val) => { 
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  };
  if (port >= 0) {
    return port;
  };
  return false;
};
const port = normalizePort(process.env.PORT);
app.set('port', port);
/**
 * 
 * @type {Socket} 
*/ 
const io = require('socket.io')(server)
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  };
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  };
};

// const usersRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");
// const commentRoutes = require("./routes/comment");
// const likesRoutes = require("./routes/likes");


// dataBase.connect(function(error) {

//   if (error){
//     console.log("Non Connecté à la base de données MySQL!")
//   }else{
//     console.log("Connecté à la base de données MySQL!");

//   }
// });

// mise en place des headers
app.use(express.json());
  app.use('public/assets/styles/style.css', express.static(path.join(__dirname, './public/assets/styles')))
  app.use('/assets/images', express.static(path.join(__dirname, "./public/assets/images")));
  // app.use("/api/post", postRoutes);
  // app.use("/api/auth", usersRoutes);
  // app.use("/api/comment", commentRoutes);
  // app.use("/api", likesRoutes);
  
  //module.exports = app;
app.use(express.static('public'));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'/public/index.html'))
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('content-type', 'application/json');
    next();
  });
  
server.on('error', errorHandler);  // si le serveur a une erreur sa nous la renvoie

server.on('listening', () => { //si tout est ok, ecoute l'adresse et on y ajoute le port
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  
  console.log(`Listening on  http://localhost:${bind.split(' ')[1]}`); // on renvoie ecoute sur et le port a la console pour dire que tout c'est bien passer
});

// on applique la fonction listen au server avec le port en argument
server.listen(port);
let rooms = [];
io.on('connection',(socket)=>{
  
  console.log(`[connection] ${socket}`)
  socket.on('userData',(player)=>{
    console.log(`[playerData] ${player.username}`)
    let room = null

    if(!player.roomId){
      room = createRoom(player)
      console.log(`[create room] - ${room.id} - ${player.username}`)
    }else{
      room = rooms.find(r => r.id === player.roomId);
      if(room === undefined){
        return
      }
      room.players.push(player)
    }
    socket.join(room.id)
    io.to(socket.id).emit('join room', room.id)
    if(room.players.length === 2){
      io.to(room.id).emit('start game', room.players);  
    }
  })
  socket.on('get rooms',()=>{
    io.to(socket.id).emit('list rooms', rooms)
  })
})
const createRoom = (player) => {
  const room = {id: roomId(), players: []};
  player.roomId = room.id;
  room.players.push(player)
  rooms.push(room);

  return room;

}
const roomId = () => {
  return Math.random().toString(36).substring(2, 9);
}