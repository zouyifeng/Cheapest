const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const routes = require('./routes/index')


const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extend: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', routes)

module.exports = app