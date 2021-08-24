const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const path = require("path");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

const users = {};

io.on("connection", (socket) => {
	if (!users[socket.id]) {
		users[socket.id] = socket.id;
	}
	socket.emit("yourID", socket.id);
	console.log("New client connected:", socket.id);
	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
	});
	socket.on("play/pause", (msg) => {
		console.log("play/pause: ", msg);
		io.emit("play/pause", msg);
	});
	socket.on("sync", (time) => {
		console.log("sync: ", time);
		io.emit("sync", time);
	});
	socket.on("seekTo", (time) => {
		console.log("seekTo: ", time);
		io.emit("seekTo", time);
	});
	socket.on("shareUrl", (url) => {
		console.log("shareUrl: ", url);
		io.emit("shareUrl", url);
	});
	socket.on("callUser", (data) => {
		console.log("Incoming call from: ", socket.id);
		io.emit("hey", data);
	});
	socket.on("acceptCall", (data) => {
		io.emit("callAccepted", data);
	});
});

if (process.env.PROD === "true") {
	app.use(express.static(path.join(__dirname, "./front/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./front/build/index.html"));
	});
}

server.listen(port, () => console.log(`Listening on port ${port}`));
