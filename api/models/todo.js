import mongoose  from "mongoose";

const Schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    timestamp:{
        type: String,
        default: Date.now()
    }
})

const Todo = mongoose.model('Todo', Schema);

export default Todo