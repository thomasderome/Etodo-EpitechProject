require("dotenv").config({path: "../.env"});
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// LOAD AUTH ROUTE
const auth_routes = require("./routes/auth/auth")
app.use("/", auth_routes);

// SYSTEM VERIF TOKEN
const verif_token = require("./middleware/auth");
app.use(verif_token);

// HERE ALL NEW ROUTE FOR TODO ACCESS WITH SECURE SYSTEM

// LOAD ERROR HANDLER
const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

// RUN THE SERVER ON SPECIFIC CODE
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

