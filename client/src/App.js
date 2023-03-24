import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/UserComponent/home";
import Login from "./Components/AdminComponent/Login/login";
import Portal from "./Components/AdminComponent/AdminPortal/portal";
import './App.css';
import React from "react";

function App() {
  //replace authentication with jwt access token
  const authenticate = window.localStorage.getItem('login')
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Login />}></Route>

          {/*Restricted Route*/}
          <Route path="/admin/home" element={<Portal admin={authenticate}/>}></Route>
          <Route path = "*" element={<h3>No page found! 404 error</h3>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
