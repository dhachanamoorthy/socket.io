// Import packages
const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

// Configuration
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'src/index.html');

// Start server
const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log("Listening on localhost:" + PORT));
// Initiatlize SocketIO
const io = socketIO(server);
// Register "connection" events to the WebSocket
io.on("connection", function (socket) {
    console.log("Entered Socket");
    // Register "join" events, requested by a connected client
    socket.on("join", function (room) {
        // join channel provided by client
        socket.join(room)
        // Register "image" events, sent by the client
        console.log(io.path)
        socket.on("audioblob", function (msg) {
            // Broadcast the "image" event to all other clients in the room
            socket.broadcast.to(room).emit("audioblob", msg);
        });
    })
});