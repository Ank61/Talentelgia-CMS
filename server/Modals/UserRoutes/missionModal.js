const mongoose = require("mongoose")
const schema = mongoose.Schema;
const aboutUs = new schema({
    Modules: [{
        moduleName: {
            type: String
        },
        data: {
            type: String
        },
        updatedData: {
            type: String
        },
    }
        , {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    }]
})
const aboutUsModal = mongoose.model("AboutU", aboutUs)
module.exports = aboutUsModal;