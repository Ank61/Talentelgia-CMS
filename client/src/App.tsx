import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/UserComponents/home";
import Login from "./Components/AdminComponents/Authentication/login";
import AboutUs from "./Components/UserComponents/aboutUs";
import Dashboard from "./Components/AdminComponents/Pages/dashboard";
import AdminAboutUs from "./Components/AdminComponents/Pages/AboutUs/aboutUs";
import AboutUsDynamic from "./Components/AdminComponents/Pages/AboutUs/aboutUsModule";
import Header from "./Components/AdminComponents/Pages/Header/header";
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutus" element={<AboutUs/>}></Route>
          <Route path="/admin" element={<Login />}></Route>
          {/* <Route path="/admin/home" element={<Portal/>}></Route> */}
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
          <Route path="/admin/aboutus" element={<AdminAboutUs/>}></Route>
          <Route path="/admin/header" element={<Header/>}></Route>
          <Route path= {`/admin/aboutus/:id`} element={<AboutUsDynamic/>}></Route>
          {/*Restricted Route*/}
          {/* <Route path="/admin/home" element={<Portal admin={authenticate}/>}></Route> */}
          <Route path = "*" element={<h3>No page found! 404 error</h3>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;