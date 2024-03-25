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

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.getIdContato = async function (id) {
    if (typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.prototype.register = async function () {
    this.valid();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valid = async function () {
    this.cleanUp();
    // Validando
    // Email tem que ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) { this.errors.push('Email inválido.'); };
    if (!this.body.name) this.errors.push('Nome é um campo obrigatório.');
    if (!this.body.email && !this.body.tel) this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone');
}

Contato.prototype.cleanUp = async function () {
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

// class Contato {
//     constructor(body) {
//         this.body = body;
//         this.errors = [];
//         this.contato = null;
//     }

//     async register() {
//         this.valid();

//         if (this.errors.length > 0) return;

//         this.contato = await ContatoModel.create(this.body);
//     }

//     async getIdContato(id) {
//         if (typeof id !== 'string') return;
//         const user = await ContatoModel.findById(id);
//         return user;
//     }

//     valid() {
//         this.cleanUp();
//         // Validando
//         // Email tem que ser válido
//         if (this.body.email && !validator.isEmail(this.body.email)) { this.errors.push('Email inválido.'); };
//         if (!this.body.name) this.errors.push('Nome é um campo obrigatório.');
//         if (!this.body.email && !this.body.tel) this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone');
//     }

//     cleanUp() {
//         for (const key in this.body) {
//             if (typeof this.body[key] !== 'string') {
//                 this.body[key] = '';
//             }
//         }

//         this.body = {
//             name: this.body.name,
//             surname: this.body.surname,
//             email: this.body.email,
//             tel: this.body.tel,
//         };

//     }
// }


module.exports = Contato;