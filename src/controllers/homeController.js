exports.initialPage = (req, res) => {
    // req.session.user = { name: "Hiago", loggedIn: true };
    // console.log(req.session.user);

    // req.flash('info', 'information');
    // req.flash('error', 'error');
    // req.flash('success', 'Onsuccess');
    // console.log(req.flash('info'), req.flash('error'), req.flash('success'));

    res.status(200).render('index', {
        title: `My title page`,
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
    return
}

exports.postPage = (req, res) => {
    res.status(200).send(req.body);
    return
}