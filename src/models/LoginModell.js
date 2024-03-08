const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true, },
    password: { type: String, required: true, },
})

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        // Se tiver algum error => não posso cadastrar na base de dados.
        this.errors = [];

        this.user = null;
    }

    async register() {
        this.valid();
        if (this.errors.length > 0) { return };

        await this.userExists();

        if (this.errors.length > 0) { return };

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await LoginModel.create(this.body);
        } catch (error) {
            console.log(error.message);
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ emai: this.body.emai });
        if (user) this.errors.push("Usuário já existe.");
    }

    valid() {
        this.cleanUp();
        // Validando
        // Email tem que ser válido
        if (!validator.isEmail(this.body.email)) { this.errors.push('Email inválido.'); };

        // A senha precisa estar entre 5 a 30 caracteres
        if (this.body.password.length < 4 || this.body.password.length > 30) {
            this.errors.push('Sua senha precisa estar entre 5 a 30 caracteres');
        }
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