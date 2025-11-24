require("dotenv").config({path: "../.env"});
const bodyParser = require("body-parser");
const express = require("express");
const verif_token = require("./middleware/auth");
const cors = require("cors");
const port = process.env.PORT;

const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})


app.use(cors());
app.use(bodyParser.json());

io.on("connection", (socket) => {
    console.log(`Connected on ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Disconnected from ${socket.id}`);
    })
})

app.set("io", io);

// LOAD AUTH ROUTE
const auth_routes = require("./routes/auth/auth")
app.use("/", auth_routes);

// HERE ALL ROUTE FOR TODO ACCESS WITH SECURE SYSTEM
const todos_routes = require("./routes/todos/todos");
app.use("/todos", verif_token, todos_routes);

// HERE ALL ROUTE FOR USER ACCESS
const user_routes = require("./routes/user/user");
app.use("/user", verif_token, user_routes);

// HERE ALL ROUTE FOR TASK
const task_routes = require("./routes/todos/task");
app.use("/tasks", verif_token, task_routes);

// HERE ALL ROUTE FOR SHARE
const share = require("./routes/share/share");
app.use("/share", verif_token, share);

// LOAD ERROR HANDLER
const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

// LOAD NOT FOUND
const notFound = require("./middleware/notFound.js");
app.use(notFound);

// RUN THE SERVER ON SPECIFIC CODE
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

