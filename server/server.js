import express from "express";
import "dotenv/config";
import cors from "cors";
import https from "http";
import { connectDB } from "./lib/db.js";

import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRouter.js";

// create express app and HTTP server

const app=express();
const server=https.createServer(app);

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
