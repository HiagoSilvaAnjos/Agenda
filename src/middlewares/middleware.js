exports.myMiddlewareGlobal = (req, res, next) => {
    res.locals.myViariableLocal = "this value at variable local"
    next();
};

exports.checkCsrfError = (err, req, res, next) => {

    if (err && err.code === "EBADCSRFTOKEN") {
        console.log("Success in ERROR")
        return res.render("404");
    }

};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};