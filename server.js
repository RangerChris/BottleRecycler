"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, "")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
