"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var express_rate_limit_1 = require("express-rate-limit");
var app = express();
var port = process.env.PORT || 80;
// Set up rate limiter: maximum of 100 requests per 15 minutes
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
// Apply rate limiter to all requests
app.use(limiter);
app.use(express.static(path.join(__dirname, "")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
