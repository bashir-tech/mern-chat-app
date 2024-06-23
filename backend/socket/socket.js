import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

// Maps to store user and visitor socket IDs
const userSocketMap = {}; // {userId: socketId}
const visitorSocketMap = {}; // {visitorId: socketId}

// Function to get receiver socket ID
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId] || visitorSocketMap[receiverId];
};

// Handling new connections
io.on("connection", (socket) => {
	console.log("a user or visitor connected", socket.id);

	const userId = socket.handshake.query.userId;
	const visitorId = socket.handshake.query.visitorId;

	if (userId != "undefined") {
		userSocketMap[userId] = socket.id;
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	} else if (visitorId != "undefined") {
		visitorSocketMap[visitorId] = socket.id;
		io.emit("getOnlineVisitors", Object.keys(visitorSocketMap));
	}

	// Handling disconnection
	socket.on("disconnect", () => {
		console.log("user or visitor disconnected", socket.id);
		if (userId != "undefined") {
			delete userSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		} else if (visitorId != "undefined") {
			delete visitorSocketMap[visitorId];
			io.emit("getOnlineVisitors", Object.keys(visitorSocketMap));
		}
	});
});

export { app, io, server };
