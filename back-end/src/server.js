"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var PORT = process.env.PORT || 5001;
app_js_1.default.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
