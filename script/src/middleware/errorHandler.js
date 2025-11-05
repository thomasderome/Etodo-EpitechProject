const {JsonWebTokenError, TokenExpiredError} = require("jsonwebtoken");
const HandlerError = (err, req, res, next) => {
    if (err instanceof TokenExpiredError) res.status(403).send({"msg": "Token is not valid"});
    else if (err instanceof JsonWebTokenError) res.status(500).send({"msg": "No token, authorization denied"});
    else if (err instanceof TypeError) res.status(500).send({"msg": "Bad parameter"});
    else res.status(500).send({"msg": "Internal server error"});
}

module.exports = HandlerError;

