const HandlerError = (err, req, res, next) => {
    if (err instanceof TypeError) res.status(500).send({"msg": "Bad parameter"});
    else res.status(500).send({"msg": "Internal server error"});
}

module.exports = HandlerError;

