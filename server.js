import express from "express"
import connectToDB from "./db/connectToMongoDB.js";

const app = express();








app.listen('3000', (req,res)=>{
    connectToDB();
    console.log("Your server is running on http://localhost:3000")
})