import express from "express";
import "dotenv/config";
import cors from "cors";
import https from "http";
import { connectDB } from "./lib/db.js";

// create express app and HTTP server

const app=express();
const server=https.createServer(app);

//Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req,res)=> res.send("server is live"));

//connect to mongodb

await connectDB();

const PORT =process.env.PORT || 5000;

server.listen(PORT, ()=> console.log("Server is running on PORT :"+ PORT));
