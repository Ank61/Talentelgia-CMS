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
app.post("/createModule",middleware,
    check('moduleId')
        .notEmpty()
        .withMessage("Kindly enter moduleID")
        .isLength({ min: 1, max: 6 })
        .withMessage("ModuleId must atleast 1 or not be greater than 6 digits")
        .matches(/^[0-9]+$/)
        .withMessage('Enter Numbers only'),
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
                const moduleId = request.body.moduleId;
                const updatedResponse = await aboutUsModal.findOneAndUpdate({},
                    { $push: { Modules: { moduleName: `${moduleName}`, data: `${data}`, moduleId: `${moduleId}` } } },
                    { new: true }
                ).exec()
                return response.status(200).send(updatedResponse)
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

module.exports = app;