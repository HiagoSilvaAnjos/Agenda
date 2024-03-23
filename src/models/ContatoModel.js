const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    surname: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
    dateCreate: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.contato = null;
    }
}

Contato.prototype.register = function () {
    this.valid();
};

Contato.prototype.valid = function () {
    this.cleanUp();
    // Validando
    // Email tem que ser válido
    if (!validator.isEmail(this.body.email)) { this.errors.push('Email inválido.'); };
}

Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        surname: this.body.surname,
        email: this.body.email,
        tel: this.body.tel,
    };

}

module.exports = Contato;