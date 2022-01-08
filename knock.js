module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    
    app.post('/knock', function (req, res) {
        connection.query(`insert into calendar values(null, str_to_date('${req.body.startDate}', '%Y-%d-%m %H:%i:%s'), str_to_date('${req.body.endDate}', '%Y-%d-%m %H:%i:%s'), '${req.body.title}', '${req.body.memo}', ${req.body.color})`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else {
                isSuccess = true
                id = 0
                connection.query(`select last_insert_id() as id`, (a, b, c) => {
                    if (a) res.status(201).json({ error: err })
                    else {
                        id = b[0].id
                        if (typeof(req.body.userid) === typeof('')) {
                            connection.query(`insert into calendar_user values(${id}, '${req.body.userid}', null, 0)`, (err, results, fields) => {
                                if (err) res.status(201).json({ error: err })
                                else res.status(200).json({ data: results })
                            })
                        }
                        else {
                            for (let i = 0; i < req.body.userid.length; i++) {
                                connection.query(`insert into calendar_user values(${id}, '${req.body.userid[i]}', null, 0)`, (err, results, fields) => {
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
    
    return router
}
