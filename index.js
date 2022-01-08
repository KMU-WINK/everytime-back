const express = require('express')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
  host: `${process.env.DBHOST}`,
  user: `${process.env.DBUSER}`,
  password: `${process.env.DBPASSWORD}`,
  database: `${process.env.DBDATABASE}`,
  dateStrings: 'date'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'))
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use('/', require('./calendar')(app, connection))
app.use('/', require('./sign')(app, connection))

app.listen(3000)