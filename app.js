const express = require("express");
const app = express();
const checkRedirects = require("./routes/checkRedirectsRoute");
const ping = require("./routes/ping");
app.use(express.json());
app.use("/checkRedirects", checkRedirects);
app.use("/ping",ping);

module.exports = app;

