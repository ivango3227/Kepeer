import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

function Header(){
 
    return(
    <header>
      <h1 className="header h1">Keeper app</h1>
     <NavLink  style={{textDecoration:"none"}} to="/" >
     <Button variant="outline"  style={{color:"#fff"}} >Home</Button>
      </NavLink> 
      <NavLink  style={{textDecoration:"none"}}  to="/about" >
     <Button variant="text" style={{color:"#fff"}} >About</Button>
      </NavLink> 
    </header>
    
    
    );
}
export default Header;