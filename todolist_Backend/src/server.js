import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import {todoRouter} from './api/todo/todo.router';

const  PORT = 4000;
const  app = express();
app.use( cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRouter);
mongoose.connect('mongodb+srv://Cuongyd196:1@cluster0.q4glj.mongodb.net/db_todolist?retryWrites=true&w=majority');

mongoose.connection.once('open', function () {
    console.log("Connection mongodb success");

})

app.listen(PORT, function () {
    console.log(" Server is running on Port : ", PORT);
})


