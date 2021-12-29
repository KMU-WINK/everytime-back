module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    app.get('/monthly', function (req, res) {
        connection.query(`select * from calendar where userid = ${req.body.userid} and startDate >= '${req.body.year}-${req.body.month}-01' and startDate < (date_add('${req.body.year}-${req.body.month}-01', interval 1 month))`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.get('/weekly', function (req, res) {
        connection.query(`select * from calendar where userid = ${req.body.userid} and startDate >= '${req.body.year}-${req.body.month}-${req.body.day}' and startDate < (date_add('${req.body.year}-${req.body.month}-${req.body.day}', interval 1 week))`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/calendar', function (req, res) {
        connection.query(`insert into calendar values(null, str_to_date('${req.body.startDate}', '%Y-%d-%m %H:%i:%s'), str_to_date('${req.body.endDate}', '%Y-%d-%m %H:%i:%s'), '${req.body.userid}', 0, '${req.body.title}', '${req.body.desc}', ${req.body.isFixed})`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.delete('/calendar', function (req, res) {
        connection.query(`delete from calendar where id = ${req.body.id} and userid = '${req.body.userid}'`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/responseFollow', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/responseKnock', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.get('/searchUser', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.get('/searchGroup', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/followGroup', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/followUser', function (req, res) {
        connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    return router
}