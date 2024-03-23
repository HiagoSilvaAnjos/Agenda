const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    }
})

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.contato = null;
    }
}


module.exports = Contato;