const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    farmName:  {
        type: String,
        required: true
    },
    description: String,
    farmImg: {
        type: String,
        default: "no-image.jpg"
    }
})
module.exports = mongoose.model('Farm', farmSchema);