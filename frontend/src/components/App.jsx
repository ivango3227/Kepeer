import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import React,{useState,useEffect} from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NoteSection from "./NoteSection";
import AboutPage from "./AboutPage";


function App(){
 

    return(
        <Router>
         <Header/>
         <Main />
         <Footer />
        </Router>
    
    );
}

function Main() {
    return(
      <Routes>
        <Route path="/" element={<NoteSection />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    );
  }
  
export default App;