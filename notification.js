module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()


    app.get('/notification_follow', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select f.*, u.* from notification_follow as f join user as u on f.senderid = u.id where f.userid = '${id}'`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/accept_follow', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.senderEmail.split('@')[0]
        connection.query(`delete from notification_follow where userid = '${id}' and senderid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                connection.query(`insert into follower values('${id}', '${tid}')`, (err, results, fields) => {
                    if (err) res.status(201).json({ error: err })
                    else {
                        res.status(200).json({ data: results })
                    }
                })
            }
        })
    })

    app.post('/decline_follow', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.senderEmail.split('@')[0]
        connection.query(`delete from notification_follow where userid = '${id}' and senderid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/notification_knock', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select u.*, c.* from calendar_user as u join calendar as c on u.calendarid = c.id where senderid is not null and userid = '${id}' and accepted = 0;`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/accept_knock', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.senderEmail.split('@')[0]
        connection.query(`update calendar_user set accepted = 1 where senderid = '${tid}' and userid = '${id}' and calendarid = ${req.body.senderEmail}`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/decline_knock', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.senderEmail.split('@')[0]
        connection.query(`delete from calendar_user where senderid = '${tid}' and userid = '${id}' and calendarid = ${req.body.senderEmail}`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    return router
}
