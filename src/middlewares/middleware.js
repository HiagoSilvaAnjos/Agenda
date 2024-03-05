exports.myMiddlewareGlobal = (req, res, next) => {
    res.locals.myViariableLocal = "this value at variable local"
    next();
};

exports.checkCsrfError = (err, req, res, next) => {

    if (err) {
        console.log("Success in ERROR")
        return res.render("404");
    }

    next();

};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};