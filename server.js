import express from "express"
import connectToDB from "./db/connectToMongoDB.js";
import cors from 'cors';
import mainRouter from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/v1/", mainRouter);




app.listen('3000', (req,res)=>{
    connectToDB();
    console.log("Your server is running on http://localhost:3000")
})