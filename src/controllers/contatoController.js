const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.status(200).render("contato", {
        contato: {}
    });
};

exports.register = async (req, res) => {

    try {
        const contato = new Contato(req.body);
        await contato.register();


        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }

        req.flash('success', "Contato registrado com sucesso!");
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }


};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.getIdContato(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
}