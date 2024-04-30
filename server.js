import express from "express"
import connectToDB from "./db/connectToMongoDB.js";
import cors from 'cors';
import mainRouter from "./routes/index.js";
import path from 'path';
import hbs from 'hbs'
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))


const viewPath = path.resolve('./views')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use("/api/v1/", mainRouter);


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/forget-password', (req, res) => {
    res.render('forget-password')
})

app.get('/reset-password/:token?', (req, res) => {
    res.render('reset-password')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/create-project', (req, res) => {
    res.render('create-project')
})

app.get('/show-project', (req, res) => {
    res.render('show-project')
})
app.get('/profile', (req, res) => {
    res.render('profile')
})
app.get('/report', (req, res) => {
    res.render('report')
})

app.listen('5000', (req, res) => {
    connectToDB();
    console.log("Your server is running on http://localhost:5000")
})