import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running on port ${ PORT }`);
});
