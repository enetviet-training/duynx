exports.logRequest = (req, res, next) => {
    console.log((new Date).toLocaleString() + " : " + req.method + " " + req.originalUrl);
    next();
}