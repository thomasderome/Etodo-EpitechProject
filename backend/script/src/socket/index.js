const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { verif_todo_access } = require("./socket.query")

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) next(new Error("Token is not valid"));

        try {
            const verify_token = jwt.verify(token, process.env.SECRET);

            socket.user_id = verify_token.id;
            if (verify_token) next();
        } catch { next(new Error("Token is not valid")); }
    })

    io.on("connection", (socket) => {
        console.log(`The user ${socket.user_id} connected on ${socket.id}`);
        socket.join(`user:${socket.user_id}`);

        socket.on("disconnect", () => {
            console.log(`Disconnected from ${socket.id}`);
        })

        socket.on("join_todo", async (todo_id, next) => {
            const verif = await verif_todo_access(socket.user_id, todo_id);
            if (verif) {
                socket.rooms.forEach((room) => {
                    if (room.startsWith("todo:")) {
                        console.log(room)
                        socket.leave(room);
                        return;
                    }
                });

                socket.join(`todo_id:${todo_id}`);
                io.to(`user:${socket.user_id}`).emit(`notification`, `You are join this todo ${todo_id}`);
            }
            else io.to(`user:${socket.user_id}`).emit("notification","Authorization denied")
        })
    })
    return io;
}
