const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    }
})

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {
    constructor() {

    }
}

module.exports = Home;