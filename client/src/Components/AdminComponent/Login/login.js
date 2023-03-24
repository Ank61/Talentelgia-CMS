import React, { useState } from "react";
import "./login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginData)
        navigate("/admin/home")
    }
    function handleEmail(e) {
        const { email, value } = e.target
        setLoginData((prev) => ({
            ...prev,
            email: value
        }))
    }
    function handlePassword(e) {
        const { password, value } = e.target
        setLoginData((prev) => ({ ...prev, password: value }))
    }


    return (
        <div className=" auth-wrapper d-flex no-block justify-content-center align-items-center " >
            <div className="auth-box p-4 bg-white rounded">
                <div id="loginform">
                    <div className="logo">
                        <h3 className="box-title mb-3">Login</h3>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form className="form-horizontal mt-3 form-material" id="loginform" onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-group mb-2" style={{ width: 300 }}>
                                    <div className="LoginError">
                                        <input className="form-control" type="text" placeholder="Enter email" value={loginData.email} onChange={(e) => handleEmail(e)} />
                                        <span style={{ height: 20, color: 'red' }}></span>
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <div className="LoginError">
                                        <input class="form-control" type="password" placeholder="Enter password" value={loginData.password} onChange={(e) => handlePassword(e)} />
                                        <span style={{ height: 20, color: 'red' }}></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex">
                                        <div class="checkbox checkbox-info pt-0">
                                            <input id="checkbox-signup" type="checkbox" className="material-inputs chk-col-indigo" />
                                            <label for="checkbox-signup"> &nbsp;Remember me </label>
                                        </div>
                                        <div className="ms-auto">
                                            <p >&nbsp;Forgot password?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center mt-4 mb-3">
                                    <div className="col-xs-12">
                                        <button className=" btn btn-info d-block w-100 waves-effect waves-light" type="submit">
                                            Log In
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;