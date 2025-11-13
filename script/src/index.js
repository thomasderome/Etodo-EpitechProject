require("dotenv").config({path: "../.env"});
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


// LOAD AUTH ROUTE
const auth_routes = require("./routes/auth/auth")
app.use("/", auth_routes);

// SYSTEM VERIF TOKEN
const verif_token = require("./middleware/auth");
app.use(verif_token);

// HERE ALL NEW ROUTE FOR TODO ACCESS WITH SECURE SYSTEM
const todos_routes = require("./routes/todos/todos");
app.use("/", todos_routes);

// HERE ALL NEW ROUTE FOR USER ACCESS
const user_routes = require("./routes/user/user");
app.use("/", user_routes);

// LOAD ERROR HANDLER
const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

// RUN THE SERVER ON SPECIFIC CODE
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

