var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");

var app = express();

app.use("/", indexRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
