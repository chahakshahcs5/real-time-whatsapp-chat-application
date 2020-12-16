const http = require('http');

const express = require('express');

const app = express();

const server =  http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>{
    console.log(`istening server at ${PORT}`);
});

app.use(express.static(__dirname + '/public/')); 

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
})

// socket

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('sendMessage', (msg) => {
        socket.broadcast.emit('sendMessage', msg)    
    })
});


