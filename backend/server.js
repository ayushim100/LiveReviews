const express = require("express");
const bodyParser = require('body-parser');
const dbConfig = require('./config');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const reviewRoutes = require('./routes/review')
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/', reviewRoutes(io))


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});