exports.index = (req, res) => {
    res.status(200).render("contato");
};

exports.register = (req, res) => {
    res.send("OI");
};