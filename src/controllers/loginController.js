const Login = require('../models/LoginModell');

exports.index = (req, res) => {
    res.render('login')
}

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            console.log(login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return
        }

        req.flash('success', "Seu usuário foi criado com succeso!");
        req.session.save(() => {
            return res.redirect('/login');
        });
    } catch (error) {
        console.log(error)
        return res.render('404');
    }


}