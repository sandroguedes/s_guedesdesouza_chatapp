const express = require("express");
const path = require("path");
const messenger = require("socket.io")();
const app = express();
const port = process.env.PORT || 5050;
const server = app.listen(port, () => {
    console.log(`app currently executing on ${port}`);
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

messenger.attach(server);

messenger.on('connection', (socket) => {
    console.log(`1 user connected: ${socket.id}`);
    socket.emit('connected', { socketID: `${socket.id}`, message: 'a new connection has been detected' });
    socket.on('chatmessage', function(message) {
        console.log(message);
        messenger.emit('message', { id: socket.id, message: message })
    });
    socket.on("disconnect", () => {
        console.log("1 USER has just disconnected");
    })
});