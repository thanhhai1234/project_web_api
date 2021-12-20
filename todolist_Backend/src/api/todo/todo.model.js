import mongoose  from'mongoose' ;
import mongoosePaginate from 'mongoose-paginate';


const { Schema } = mongoose;
const todoSchema = new Schema({
    todo_title: {
        type: String
    },
    todo_content: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean,
        default: false
    }
});
todoSchema.plugin(mongoosePaginate);
export  default  mongoose.model('Todo',todoSchema);
