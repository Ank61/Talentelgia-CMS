import { useEffect, useState } from "react";
import axios from "../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
import  Helmet  from 'react-helmet';
import Header from "../Common/Header/header";
function AboutUs(){
    const [data,setData] = useState()
    const [metaTag , setMetaTag] = useState<string>("This is new page")
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

    // function handleMeta(){
    //     setMetaTag("This is about us page")
    // }
return (
    <div>
        <Helmet 
        title = {"This is new title for About page"}
        meta={[
        {
          name: `description`,
          content: metaTag,
        } 
      ]}/>
      <Header/>
      <div  className="AboutUsMainDiv"> 
      <br></br>
        {data? <div dangerouslySetInnerHTML={{ __html: data }}></div> : ""}
        </div>
    </div>
)
}
export default AboutUs;