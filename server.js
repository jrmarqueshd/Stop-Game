const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("views engine", "html");

app.use("/", (req, res)=>{
    res.render("index.html");
});

server.listen(3000);