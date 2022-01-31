require ("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose= require("mongoose");
const ejs=require("ejs");
// const cors=require("cors");
const app=express();

const PORT=process.env.PORT || 9000;
const DB_URI ="mongodb://localhost:27017/";
const  DB ="noteDB";

//Middleware
app.use(express.json());

app.set('view engine', 'ejs');
mongoose.connect(DB_URI+DB,{
  useUnifiedTopology: true,
  useNewUrlParser:true,
  connectTimeoutMS:10000
  
});
const db=mongoose.connection;

db.once("open",()=>console.log("connected to the database"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//app.use(cors());

//Event listeners
db.once("open",()=>console.log("conected to ${DB} database"));

let NoteSchema= new mongoose.Schema(
  {
    title: String,
    content: String
  }
)
let Note=new mongoose.model("Note",NoteSchema);

//Route to get to all posts 
app.get("/api/notes",function(req,res){
   Note.find({},{__v:0},(err,docs)=>{
     if(!err){
       res.json(docs);

     } else{
       res.status(400).json({"error":err});
     }
   });
 });

 //Route to add a post
 app.post("/api/note/add",function(req,res){
   let note = new Note(req.body);
   note.save((err,result)=>{
     if(!err){
       delete result._doc.__v;
       res.json(result._doc);
     } else{
       res.status(400).json({"error":err});
     }
   });
 });
// Route to delete a single post
 app.post("/api/note/delete",function(req,res){
  const {id}= req.body.params;
  console.log(id);
   Note.deleteOne({_id:id},(err)=>{
     if(!err){
      console.log("succesfully deleted a note");
     } else {
       console.log(err);
     }
   })
 })

 app.patch("/api/note/change",function(req,res){
  const {value,id}=req.body; 
  console.log(value);
  console.log(req.body);
  Note.update(
    {_id:id},
    {$set:value},
    function(err){
      if(!err){
        console.log("succesfuly patched data");
      } else{
        console.log(err);
      }
    }
  )
 })

 app.listen(PORT, () => {
  console.log(app.get("env").toUpperCase() + " Server started on port " + (PORT));
});