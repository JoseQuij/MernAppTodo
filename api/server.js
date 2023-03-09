import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3002

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => console.log('Connected to DB')).catch(console.error);

import Todo from './models/todo.js';

app.get('/todos', async (req,res) =>{
    const todos = await Todo.find();
    res.json(todos)
})

app.post('/todo/new', (req,res)=>{
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
})
app.delete('/todo/delete/:id', async (req,res) =>{
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result);
})

app.get('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})
app.listen(port, () => console.log(`Server started on port ${port}`))