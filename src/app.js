var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var userRouter = require("./routes/user");

var app = express();

app.use(express.json());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
