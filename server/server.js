import express from "express";
import "dotenv/config";
import cors from "cors";
import https from "http";
import { connectDB } from "./lib/db.js";

import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRouter.js";
import { Server } from "socket.io";
// create express app and HTTP server

const app=express();
const server=https.createServer(app);

// Initialize socket.io server
export const io= new Server(server, {
	cors: {origin: "*"}
})
// Store online users
export const userSocketMap= {};

// Socket.io connections handler
io.on("connection", ( socket)=>{
	const userId= socket.handshake.query.userId;
	console.log("USer Connected",userId );

	if(userId)userSocketMap[userId]=socket.id;

	//Emit online users to all connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", ()=>{
		console.log("USer Disconnected", userId);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap))
	})


})
//Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());

//Routes setup
app.use("/api/status", (req,res)=> res.send("server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)
//connect to mongodb

await connectDB();

const PORT =process.env.PORT || 5000;

server.listen(PORT, ()=> console.log("Server is running on PORT :"+ PORT));
