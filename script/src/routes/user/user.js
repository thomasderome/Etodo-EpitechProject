const express = require("express");
const router = express.Router();
const {userInformation} = require("./user.query.js")

router.get("/user", async (req, res) => {
    const user = await userInformation(req.user_id);
    res.send(user);
})

module.exports = router;