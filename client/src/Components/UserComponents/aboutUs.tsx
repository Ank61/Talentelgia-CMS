import { useEffect, useState } from "react";
import axios from "../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
function AboutUs(){
    const [data,setData] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:8080/aboutUs/allData")
        .then(response=>{
            console.log(response.data)
            if (response.data == "Logout") {
                navigate("/admin")
            } else {
            setData(response.data)
            }
        })
        .catch(err=>console.log(err))
    }
    ,[])

return (
    <div>
        {data? <div dangerouslySetInnerHTML={{ __html: data }}></div> : ""}
    </div>
)
}
export default AboutUs;