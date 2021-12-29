module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    app.post('/signup', function (req, res) {
        connection.query(`insert into user values('${req.body.userid}','${req.body.password}','${req.body.email}')`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/signin', function (req, res) {
        connection.query(`select * from user where id = '${req.body.userid}' and password = '${req.body.password}'`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else {
                if (results.length != 1)
                    res.status(201).json({ data: results })
                else
                    res.status(200).json({ data: results })
            }
        })
    })
    return router
}