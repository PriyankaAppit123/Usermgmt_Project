var userRoute = require('../routes/user.route');
var express = require('express');
const app = express()


app.use('/user', userRoute)

module.exports = app;

