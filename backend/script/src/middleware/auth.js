const jwt = require('jsonwebtoken');

const verif_token = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(403).send({"msg": "No token, authorization denied"});
        return;
    }

    try {
        const token = authorization.split(" ")[1];
        const verify_token = jwt.verify(token, process.env.SECRET);

        req.user_id = verify_token.id;
        if (verify_token) next();
    } catch { res.status(403).send({"msg": "Token is not valid"}); }
}

module.exports = verif_token;