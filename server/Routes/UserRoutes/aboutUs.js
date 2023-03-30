const express = require("express")
const app = express()
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const middleware = require("../../Middleware/middleware")
const aboutUsModal = require("../../Modals/UserRoutes/missionModal");
const { body, validationResult, param, check } = require('express-validator');

app.get("/", async (request, response) => {
    const data = await aboutUsModal.find({}).clone().catch(err => response.status(400).send("Erro"))
    return response.status(200).send(data)
})

app.post("/update",middleware,
    async (request, response) => {
        try{
                const data = request.body.data;
                const moduleName = request.body.moduleName;
                const moduleId = request.body.moduleId
                console.log(typeof data , typeof moduleName , typeof moduleId)
                const updatedResponse = await aboutUsModal.findOneAndUpdate(
                    { Modules: { $elemMatch: { moduleId: `${moduleId}` } } },
                    { $set: { 'Modules.$.moduleName': `${moduleName}`, 'Modules.$.data': `${data}` } },
                    { new: true },
                  ).exec();
                return response.status(200).send(updatedResponse)
        }
        catch (err) {
            console.log(err)
            return response.status(200).send("Could not find")
        }
    })
app.post("/createModule",
    async (request, response) => {
        const errors = validationResult(request);
        try {
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }
            else {
                const data = request.body.data;
                const moduleName = request.body.moduleName;
                const forModuleId = await aboutUsModal.find({}).clone().catch(err => response.status(400).send("Erro"))
               
                if(forModuleId.length>0){
                    const totalLengthIndex = forModuleId[0].Modules.length;
                    const lastItemIndex = totalLengthIndex-1;
                    const getModuleId = forModuleId[0].Modules[lastItemIndex]
                    const updatedResponse = await aboutUsModal.findOneAndUpdate({},
                    { $push: { Modules: { moduleName: `${moduleName}`, data: `${data}`, moduleId: `${getModuleId.moduleId +1}` } } },
                    { new: true }
                ).exec()
                return response.status(200).send(updatedResponse)
                }
                else{
                    //create new
                const updatedResponse = new aboutUsModal({Modules : [{
                    moduleId :1,
                    data : "",
                    moduleName : `${moduleName}`
                }]})
                await updatedResponse.save();
                return response.status(200).send(updatedResponse);
                }
            }
        }
        catch (err) {
            console.log(err)
            return response.status(400).send(err)
        }
    })

    app.get("/allData" , async(request,response)=>{ // No Middleware Required
        try{
           const availableData = await aboutUsModal.find({}).clone()
           const initial = "";
           const data = await availableData[0].Modules.map(item=>item.data).reduce((accumulator, currentValue) => accumulator + currentValue,initial)
           return response.status(200).send(data)
        }
        catch(err){
            console.log(err)
            return response.status(400).send(err)
        }
    })

    app.post("/delete" , async(request,response)=>{
        try{
        const Id = request.body.moduleId;
        const result = await aboutUsModal.findOneAndUpdate({},
                { $pull: { Modules: { moduleId: Id } } }, 
                { new: true }).exec();
        return response.status(200).send(result)
        }
        catch(err){
            return response.status(400).send(err) 
        }
    })
module.exports = app;