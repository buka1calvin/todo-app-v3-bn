import mongoose, { model, Schema } from "mongoose";


const TaskSchema=new Schema({
    user:
    {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    title:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

const Task=mongoose.models.Task || model("Task",TaskSchema);
export default Task;