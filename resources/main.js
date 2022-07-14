var express = require('express');
const app = express()
var router = require('./route');
const cors = require('./app');

app.use(cors)
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ type: '*/*' }))
app.use(express.raw())
app.use(router)

module.exports = app;
