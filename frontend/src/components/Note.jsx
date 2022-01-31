import React,{useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckBoxIcon from "@material-ui/icons/CheckBox"

function Note(props){
    const [editMode,setEditMode]=useState(false);
    const [newValue,setNewValue]=useState({
        title:props.title,
        content:props.content
    })
    function handleClick(){
        props.onDelete(props.id);
    }
    function handleEdit(){
        setEditMode((prevState)=>
         !prevState);
        

    }
    function handleChange(event){
       const {name,value}=event.target;
        setNewValue((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }
        })
    }
       function saveChange(event){
           props.onEdit(newValue,props.id);
           event.preventDefault();
           setEditMode(false);
       }
    
    return(
        <div className="note">
        {editMode?(
            <div className="edit-note">
            <form clasName="edit-note">
            <input
            onChange={handleChange}
            value={newValue.title}
            name="title"
            placeholder="edit title"
            />
            <textarea
            onChange={handleChange}
            value={newValue.content}
            name="content"
            placeholder="edit content"
             rows="3"/>
            </form>
            </div>
            ): <div>
            <h1>{props.title}</h1><p>{props.content}</p></div> }
            {editMode &&(
                <button
                onClick={saveChange}
                >   
                <CheckBoxIcon />
                </button>
            )}
            <button
            onClick={handleEdit}
            >
            <EditIcon />
            </button>
            <button
            onClick={handleClick}
            ><DeleteIcon /></button>
        </div>
    );
}
export default Note;