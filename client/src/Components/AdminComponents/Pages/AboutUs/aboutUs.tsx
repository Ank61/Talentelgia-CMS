import Layout from "../../../Common/Layout/layout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../AdminPageCSS/adminPages.css"
import axios from "../../../Common/SecureInstance/axiosInstance";
import AddIcon from '@mui/icons-material/Add';
function AdminAboutUs() {
    type modules = {
        moduleName: string,
        index: Number
        //array
    }
    const [modules, setModules] = useState([])
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
                    console.log(response)
                    setModules(response.data[0].Modules)
                }
            })
            .catch(err => console.log(err))
    }, [])


function handleClick(index:Number){
    console.log("Navigating to" , `/admin/aboutus/${index}` )
    navigate(`/admin/aboutus/${index}`)
}

    return (
        <>
            <div className="mainDiv">
                <Layout title="About Us" />
            </div>
            <div className="contentDiv">
                <h3 style={{ textAlign: "center" }}>About us </h3>

                <div className="Module">
                    {modules.length > 0 ? modules.map((item: modules, index) => {
                        return (
                            <div className="moduleDiv" key={item.moduleName} onClick={()=>handleClick(index)}>
                                Module Name : {item.moduleName}
                            </div>
                        )
                    })
                        : " "}
                    <div className="moduleDiv">
                        <AddIcon />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminAboutUs;