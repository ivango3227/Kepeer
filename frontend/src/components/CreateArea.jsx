import React, {useState} from "react";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone'; 
import Button from "@material-ui/core/Button";
function CreateArea(props){
    const [isExpanded,setExpanded]=useState(false);
    const [note,setNote]=useState({
        title:"",
        content:""
    })

    function handleChange(event){
        const {name,value}=event.target;
       setNote((prevValue)=>{
           return{
           ...prevValue,
           [name]:value
           };
       })

    }
    function addNote(event){
        props.onAdd(note);
        event.preventDefault();
        setNote(()=>{ 
            return{
            title:"",
            content:""
        };
        
    });
}
    function expand(){
        setExpanded(true);
    }     

    return(
        <div>
            <form className="create-note main-form">
               {isExpanded &&(
                <input 
                name="title" 
                onChange={handleChange} 
                value={note.title}
                placeholder="Title" 

                />)}
                <textarea 
                onClick={expand}
                onChange={handleChange} 
                value={note.content}
                name="content" 
                placeholder="Take a note..." 
                rows={isExpanded?"3":"1"} 

                />
                <Button variant="contained"
                onClick={addNote}
                >
                <AddCircleTwoToneIcon /></Button>
            </form>
        </div>
    );
}

export default CreateArea;