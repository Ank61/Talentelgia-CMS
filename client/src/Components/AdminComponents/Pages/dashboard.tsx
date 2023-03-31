import { useEffect } from "react";
import Layout from "../../Common/Layout/layout";
import { useNavigate } from "react-router";

function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem("Login")) {
            navigate("/admin")
        }
    })
    return (
        <>
            <div className="mainDiv">
                <Layout title="Dashboard" moduleName=""/>
            </div>
            <div className="contentDiv">
                <h3 style={{ textAlign: "center" }}>Coming Soon</h3>
            </div>
        </>
    )
}
export default Dashboard;