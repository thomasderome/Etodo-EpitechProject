require("dotenv").config({path: "../.env"});
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// LOAD AUTH ROUTE
const auth_routes = require("./routes/auth/auth")
app.use("/", auth_routes);

// LOAD MIDDLEWARE
const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

// RUN THE SERVER ON SPECIFIC CODE
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

