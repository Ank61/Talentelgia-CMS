import { useEffect } from "react";
import axios from "../Common/SecureInstance/axiosInstance";


function AboutUs(){
    useEffect(()=>{
        axios.get("")
        .then(response=>{})
        .catch(err=>console.log(err))
    }
    ,[])

    return (
        <div>
            This is user's home page
        </div>
    )
    }
    export default AboutUs;