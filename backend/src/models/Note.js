import mongoose from "mongoose";

    //1-createa schema
    //2-modele based on that scheama

const noteSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        require:true
    }, 
},{timestamps:true} //created At,update At
)

const Note = mongoose.model("Note", noteSchema);

export default Note;