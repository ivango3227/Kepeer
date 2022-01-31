import React,{useState,useEffect} from "react";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea.jsx";
import axios from "axios";

function NoteSection(){

    const [notes,setNotes]=useState([]);   
 
 //Fetch notes from server
 useEffect(()=>{
     axios.get("/api/notes")
     .then((res)=>setNotes(res.data))
     .catch((err)=>console.error(err));
 });
 
 //Add a note to the database
 function addNote(note){
     axios.post("/api/note/add",note)
     .then((res)=>setNotes([...notes,res.data]))
 .catch((err)=> console.log(err));
}
  
function deleteNote(id){
      axios.post("api/note/delete",{
      params:{id}
    })
  .then(response=>{
    setNotes(notes.filter(note=>note._id !== id));
  })
  .catch((err)=>console.log(err));
}
function editNote(value,id){
    axios.patch("/api/note/change",{value,id});
}
return(
    <div>
         <CreateArea 
           onAdd={addNote}  
         />
         {notes.map((note)=>
         <Note 
         key={note._id}
         id={note._id}
        title={note.title}
        content={note.content}
        onEdit={editNote}
        onDelete={deleteNote} 
     />)}  
    </div>
)
         }
     export default NoteSection;