"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv = require("dotenv");
var users_js_1 = require("./routes/users.js");
var posts_js_1 = require("./routes/posts.js");
dotenv.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/users', users_js_1.default);
app.use('/posts', posts_js_1.default);
app.get('/', function (_req, res) {
    res.send('API is running...');
});
exports.default = app;
