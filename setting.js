module.exports = function (app, connection) {
    var express = require('express')
    var fs = require('fs')
    var router = express.Router()

    app.post('/upload', (req, res, next) => {
        let uploadFile = req.files.picture
        const fileName = req.body.email.split('@')[0] + '.' + req.files.picture.name.split('.')[1]
        uploadFile.mv(`${__dirname}/public/${fileName}`,
            (err) => {
                if (err) return res.status(500).send(err)
                else res.status(200).send(`${__dirname}/public/${fileName}`)
            })
    })

    app.get("/public/:filename", function (req, res) {
        const file = `${__dirname}/public/${req.params.filename}`;
        res.download(file);
    });

    app.get("/picture/:email", function (req, res) {
        const id = req.params.email.split('@')[0]
        const file = `${__dirname}/public/${id}.png`;
        res.download(file);
    });

    app.put('/color', function (req, res) {
        connection.query(`update user set color = '${req.body.color}' where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.put('/nickname', function (req, res) {
        connection.query(`update user set nickname = '${req.body.nickname}' where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.put('/email', function (req, res) {
        connection.query(`update user set email = '${req.body.targetEmail}' where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.put('/password', function (req, res) {
        connection.query(`update user set password = '${req.body.password}' where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.delete('/user', function (req, res) {
        connection.query(`delete from user where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.put('/searchable', function (req, res) {
        connection.query(`update user set searchable = ${req.body.searchable} where email = '${req.body.email}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    return router
}
