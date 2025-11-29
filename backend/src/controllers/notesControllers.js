//this is our notecontroller files where we create function that automate the (CRUD) functions
import Note from "../models/Note.js"

//get all note using the modele Note and the function find in node
export async function getAllNotes(_,res){ //in the function argument i had that req argument i didn't use it so i remplace it with _
    try{
        const notes = await Note.find().sort({ createdAt: -1}); //newest first -1 will sort in desc order
        res.status(200).json(notes);
    
    }catch (error){
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({message:"Internal server error"})
    }
};

//get note by ID
export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.stauts(404).json({message:"note not found"});
        res.json(note);
    }catch (error){
        console.error("error in getting the note controller",error);
        res.status(500).json({message:"somthing went wrong in the server"});
    }
};


//create note takink from the request that we get from the body
//then using our Note modele and we intiliase those responses in our model then save
export async function createNote(req,res){
    try {
        //to create that we need to take those from the body
        const {title,content} = req.body;
        const note = new Note({title:title, content:content});
        
        const savedNote = await note.save();
        res.status(201).json(savedNote); //dkchi li kiraja3 lina l backend b7ale console.log
    } catch(error){
        console.error("Error in create note ", error);
        res.status(500).json({message:"Interna server error"});
    }
};

//updating note fire extracting the data from request and update in database
export async function updateNotes(req,res){
    try{
        const {title, content}= req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content},{new:true}); //the ID from the url(notes/api/:id), new data to update, return the updated document
        if (!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);

    }catch(error){
        console.error("somethig wrong updatinf the note ",error);
        res.status(500).json({message:"internal server error"});
    }
};
//deleting note
export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note deleted succ!"});
    }catch(error){
        console.error("Error deleting Note ", error);
        res.status(500).json({message:"internale server error"});
    }
};