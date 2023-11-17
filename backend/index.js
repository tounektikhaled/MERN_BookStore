//modules importation
import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/bookRoutes.js'
import cors from 'cors';

//use express
const app = express();
app.use(express.json());

// Midelware for handling CORS plolicy
//option 1: Allow All origins with default of cor(*)
//app.use(cors());



app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('welcome to our MERN tuto ')
});

app.use('/books', booksRoute);

//DB connection with mongoose
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('connection to DB succefully');
        //Create server
        app.listen(PORT, () => {
            console.log(`your appliction run on 127.0.0.1:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('error')
    });