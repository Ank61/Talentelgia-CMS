const express = require("express")
const app = express()
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const middleware = require("../../Middleware/middleware")
const aboutUsModal = require("../../Modals/UserRoutes/missionModal");

app.get("/",middleware,async(request,response)=>{
     const data = await aboutUsModal.find({}).clone().catch(err=> response.status(400).send("Erro"))
    return response.status(400).send(data)
})

app.post("/update", middleware ,async(request,response)=>{
    try {
    const data = request.body.data;
    const moduleName = request.body.moduleName;
    const updatedResponse = await aboutUsModal.replaceOne({Modules : {$elemMatch : {moduleName: "module 6"} }}, {Modules : { moduleName: 'module 7' }});
    // .updateOne({Modules : {$elemMatch:{moduleID:9}}}, {Modules : {$set: { moduleName: `${moduleName}` } }}
    // ).catch(err=> response.status(400).send("Could not find module name") );
// const data2 = await updatedResponse;
//     console.log(data2)
    return response.status(200).send(updatedResponse)    
}
     catch(err){
        console.log(err)
     } 
})
app.post("/create", middleware ,async(request,response)=>{
    try {
    const data = request.body.data;
    const moduleName = request.body.moduleName;
    const updatedResponse =  await aboutUsModal.insertOne({Modules :{moduleName : `${moduleName}`} }
    )
    //await updatedResponse.save()
console.log(updatedResponse)
    return response.status(200).send(updatedResponse)    
}
     catch(err){
        console.log(err)
     } 
})

module.exports = app;