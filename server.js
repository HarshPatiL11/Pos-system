import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import bodyParser from 'body-parser';
import { connectDb } from './DB/DB.js';
import router from './MVC/Routes/AuthRoute.js';

dotenv.config();

// rest obj
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'));

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("hello POS")
})

// api routing
app.use('/api/v1/', router);


// listen
app.listen(PORT,()=>{
    console.log(`Listening to port number ${PORT}`.bgGreen.white);
} )

// call database
connectDb()