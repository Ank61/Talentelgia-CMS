import Layout from "../../../Common/Layout/layout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../AdminPageCSS/adminPages.css"
import axios from "../../../Common/SecureInstance/axiosInstance";
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

function AdminAboutUs() {
    type Modules = {
        moduleName: string,
        index: Number
        //array
    }
    const [modules, setModules] = useState([])
    const [render ,setRender] = useState("1") 
    const [modal, setModal] = useState<boolean>(false)
    const [title, setTitle] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem("Login")) {
            navigate("/admin")
        }
        axios.get("http://localhost:8080/aboutUs")
            .then(response => {
                if (response.data == "Logout") {
                    navigate("/admin")
                } else {
                    console.log(response.data[0].Modules)
                    setModules(response.data[0].Modules)
                }
            })
            .catch(err => console.log(err))
    }, [])


    function handleClick(index: Number) {
        navigate(`/admin/aboutus/${index}`)
    }
    async function handleNewModule() {
        const obj = {
            moduleName: title,
            data: ""
        }
        await axios.post("http://localhost:8080/aboutUs/createModule", obj).then().catch(err => console.log(err))
        setRender("2")
        setTimeout(()=>{
            axios.get("http://localhost:8080/aboutUs")
            .then(response => {
                if (response.data == "Logout") {
                    navigate("/admin")
                } else {
                    console.log(response.data[0].Modules)
                    setModules(response.data[0].Modules)
                }
            })
            .catch(err => console.log(err))
        },1000)
         setModal(false);
    }

    return (
        <>
            <div className="mainDiv">
                <Layout title="About Us" moduleName=""/>
            </div>
            <div className="contentDiv">
                <h3 style={{ textAlign: "center" }}>About us </h3>

                <div className="Module">
                    {modules.length > 0 ? modules.map((item: Modules, index) => {
                        return (
                            <div className="moduleDiv" key={item.moduleName} onClick={() => handleClick(index)}>
                                Module Name : {item.moduleName}
                            </div>
                        )
                    }) : " "}
                    <div className="moduleDiv" onClick={() => setModal(true)}>
                        <AddIcon />
                    </div>
                </div>
                <Modal
                    show={modal}
                    onHide={() => setModal(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Camera</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" placeholder="Please enter Title for Module" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                        <Button variant="primary" className="mt-4" onClick={() => handleNewModule()}>Add Module</Button>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default AdminAboutUs;