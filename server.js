const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("views engine", "html");

app.use("/", (req, res)=>{
    res.render("index.html");
});

let userName = "";

io.on("connection", (socket)=>{
    socket.on("userName", (user)=>{
        userName = user;
    });
});

const gameSpace = io.of("/game");
gameSpace.on("connection", (socket)=>{
    socket.username = userName;
    socket.emit("passingUser", socket.username); 

    socket.on("sendForm", (form)=>{
        socket.broadcast.emit("sendFormToAllUsers", form);
    });
});

server.listen(3000);