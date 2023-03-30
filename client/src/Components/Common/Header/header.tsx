import { useEffect,useState } from "react";
import axios from "../SecureInstance/axiosInstance";

function Header() {
    const [data ,setData] = useState("")
    useEffect(() => {
axios.get("http://localhost:8080/header").then(response=>{
    console.log(":This is header coomponent " , response.data[0].data)
    setData(response.data[0].data)
}).catch();
    }, [])
    return (
        <>
          <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </>
    )
}
export default Header;