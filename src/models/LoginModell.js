const mongoose = require("mongoose");
const validator = require("validator");

const LoginSchema = new mongoose.Schema({
    email: { type: "string", required: true, },
    password: { type: "string", required: true, },
})

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        // Se tiver algum error => não posso cadastrar na base de dados.
        this.errors = [];

        this.user = null;
    }

    register() {
        this.valid();
        if (this.errors.length > 0) { return };
    }

    valid() {
        this.cleanUp();
        // Validando
        // Email tem que ser válido
        if (!validator.isEmail(this.body.email)) { this.errors.push('Email is invalid'); };

        // A senha precisa estar entre 5 a 30 caracteres
        if (this.body.password < 5 || this.body.password > 30) { this.errors.push('Password must be 5 to 30 characters long'); }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        };

    }
}

module.exports = Login;