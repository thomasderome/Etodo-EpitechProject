const HandlerError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        "error": "test"
    })
}

module.exports = { HandlerError };

