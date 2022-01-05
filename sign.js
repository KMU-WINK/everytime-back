module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    app.post('/signup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`insert into user values('${id}','${req.body.password}','${req.body.email}')`, (err, results, fields) => {
            if (err) console.log(err)
            else console.log(results)
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/signin', function (req, res) {
        connection.query(`select * from user where email = '${req.body.email}' and password = '${req.body.password}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                if (results.length != 1)
                    res.status(201).json({ data: results })
                else
                    res.status(200).json({ data: results })
            }
        })
    })
    app.post('/check', function (req, res) {
        connection.query(`select * from user where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                if (results.length != 0)
                    res.status(201).json({ data: results })
                else
                    res.status(200).json({ data: results })
            }
        })
    })
    return router
}
