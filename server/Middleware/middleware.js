const express = require("express")
const app = express()
const cookieparser = require('cookie-parser');
const loginModal = require("../Modals/Authentication/loginModal")
app.use(cookieparser());
const jwt = require("jsonwebtoken")
const middleware = (request, response, next) => {
    if (request.cookies?.access_Token && request.cookies?.refresh_Token) {
        const access_Token = request.cookies.access_Token;
        const refresh_Token = request.cookies.refresh_Token;
        //check the access token expiraiton 
        //check the expiration of refresh token
        jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_KEY, async function (err, decoded) {
            if (err) {
                if (err.message == "invalid signature") {
                    return response.status(400).send("Unauthorised Refresh token")
                }
                else{
                //Refresh token expired logout here 
                return response.status(400).send("Logout")
                }
                }
                  //Thre is no error with refresh token and refresh token is valid
                const user = await loginModal.findOne({ Token: refresh_Token }).catch(err => {
                return response.status(400).send("Searching refresh token",err) })
                if (user) {
                    jwt.verify(access_Token, process.env.ACCESS_TOKEN_KEY, async function (err, decoded) {
                        if (err) {
                            if (err.message == "invalid signature") {
                                return response.status(400).send("Unauthorised Token")
                            }
                            else {
                                //if expired then generate new on with the help of refresh token
                                const decoded = jwt.decode(access_Token)
                                //Check email is present in db 
                                const user = await loginModal.findOne({ Email: decoded.email }).catch(err =>
                                    response.status(400).send("Unauthorised "))
                                if (user.Token) {
                                    //Check the refresh token matched the one you gt from db and request
                                    if (user.Token == request.cookies.refresh_Token) {
                                        const newAccessToken = jwt.sign({ email: decoded.email },
                                            process.env.ACCESS_TOKEN_KEY, {
                                            expiresIn: '3m'
                                        });
                                        response.cookie('access_Token', newAccessToken, {
                                            httpOnly: true,
                                            sameSite: 'Lax'
                                        })
                                        next()
                                        //give tick here
                                       // return response.status(400).send("Token regerated")
                                    }
                                    else {
                                        return response.status(400).send("Not equal ")
                                    }
                                }
                                else {
                                    //Could not find email that means dont generate the token in this case
                                    return response.status(400).send("Unauthorised Email")
                                }
                            }
                        }
                        else {
                            //valid access token then give access 
                            next()
                        }
                    })
                }
                else{
                    console.log(user)
                    return response.status(400).send("Cou;d ot find refresh token")
                }
        })
    }
    else {
        return response.status(400).send("Refresh or access Token not present")
    }
}

module.exports = middleware;
