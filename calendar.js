module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    app.get('/monthly', function (req, res) {
        connection.query(`select c.* from calendar as c join calendar_user as u where c.id = u.calendarid and u.userid = '${req.body.userid}' and startDate >= '${req.body.year}-${req.body.month}-01' and startDate < (date_add('${req.body.year}-${req.body.month}-01', interval 1 month))`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.get('/weekly', function (req, res) {
        connection.query(`select c.* from calendar as c join calendar_user as u where c.id = u.calendarid and u.userid = '${req.body.userid}' and startDate >= '${req.body.year}-${req.body.month}-${req.body.day}' and startDate < (date_add('${req.body.year}-${req.body.month}-${req.body.day}', interval 1 week))`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    app.post('/calendar', function (req, res) {
        connection.query(`insert into calendar values(null, str_to_date('${req.body.startDate}', '%Y-%m-%d %H:%i:%s'), str_to_date('${req.body.endDate}', '%Y-%m-%d %H:%i:%s'), '${req.body.title}', '${req.body.memo}', ${req.body.color})`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                isSuccess = true
                id = 0
                connection.query(`select last_insert_id() as id`, (err1, b, c) => {
                    if (err1) res.status(201).json({ error: err1 })
                    else {
                        id = b[0].id
                        if (typeof(req.body.userid) === typeof('')) {
                            connection.query(`insert into calendar_user values(${id}, null, '${req.body.userid}', null, 1)`, (err, results, fields) => {
                                if (err) res.status(201).json({ error: err })
                                else res.status(200).json({ data: results })
                            })
                        }
                        else {
                            for (let i = 0; i < req.body.userid.length; i++) {
                                connection.query(`insert into calendar_user values(${id}, null, '${req.body.userid[i]}', null, 1)`, (err, results, fields) => {
                                    if (err) res.status(201).json({ error: err })
                                    else if (i === req.body.userid.length - 1) {
                                        res.status(200).json({ data: results })
                                    }
                                })
                            }
                        }
                    }
                })
            }
        })
    })
    app.put('/calendar', function (req, res) {
        let query = 'update calendar set '
        if(req.body.startDate) query += ` startDate = str_to_date('${req.body.startDate}', '%Y-%m-%d %H:%i:%s'),`
        if(req.body.endDate) query += ` endDate = str_to_date('${req.body.endDate}', '%Y-%m-%d %H:%i:%s'),`
        if(req.body.title) query += ` title = '${req.body.title}',`
        if(req.body.memo) query += ` memo = '${req.body.memo}',`
        if(req.body.color) query += ` color = ${req.body.color},`
        query = query.slice(0, -1)
        query += ` where id = ${req.body.id}`
        connection.query(query, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                isSuccess = true
                connection.query(`delete from calendar_user where calendarid = ${req.body.id}`, (err, b, c) => {
                    if (err) res.status(201).json({ error: err })
                    else {
                        if (typeof(req.body.userid) === typeof('')) {
                            connection.query(`insert into calendar_user values(${req.body.id}, null, '${req.body.userid}', null, 1)`, (err, results, fields) => {
                                if (err) res.status(201).json({ error: err })
                                else res.status(200).json({ data: results })
                            })
                        }
                        else {
                            for (let i = 0; i < req.body.userid.length; i++) {
                                connection.query(`insert into calendar_user values(${req.body.id}, null, '${req.body.userid[i]}', null, 1)`, (err, results, fields) => {
                                    if (err) res.status(201).json({ error: err })
                                    else if (i === req.body.userid.length - 1) {
                                        res.status(200).json({ data: results })
                                    }
                                })
                            }
                        }
                       }
                })
            }
        })
    })
    
    app.delete('/calendar', function (req, res) {
        connection.query(`delete c, u from calendar c join calendar_user u on c.id = u.calendarid where c.id = ${req.body.id}`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    return router
}