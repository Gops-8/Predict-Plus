import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import User from './models/userSchema.js';
import router from './router/auth.js'
import cookies from'cookie-parser';
import speakeasy from 'speakeasy'; 


const app = express();

app.use(express.json());
app.use(cookies());
app.use(router);

dotenv.config({path:'./config.env'})

const PORT=process.env.PORT;



connectDB();

app.get('/',(req,res) => {res.send('Hello World from the server');});

app.get('/about',(req,res) => {res.send('Hello About World from the server');});

app.get('/pricing',(req,res) => {res.send('Hello Pricing World from the server');});

app.get('/docs',(req,res) => {res.send('Hello Docs World from the server');});

app.get('/contact',(req,res) => {res.send('Hello Contact World from the server');});

app.get('/login',(req,res) => {res.send('Hello Login World from the server');});

app.get('/register',(req,res) => {res.send('Hello Register World from the server');});


console.log("Hello World ");

app.listen(PORT, ()=> {console.log(`Server is running at port ${PORT}`);});

console.log(`${process.env.SECRET_KEY}`)