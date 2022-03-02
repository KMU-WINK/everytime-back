module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    app.get('/myfollower', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select u.*, f.* from follower as f join user as u on f.followerid = u.id where f.userid = '${id}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/mygroup', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select u.*, g.* from usergroup_user as g join usergroup as u on g.usergroupid = u.id where g.userid = '${id}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/myfavfollower', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select u.*, f.* from follower as f join user as u on f.followerid = u.id where f.userid = '${id}' and f.isFav = 1`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/myfavgroup', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select u.*, g.* from usergroup_user as g join usergroup as u on g.usergroupid = u.id where g.userid = '${id}' and g.isFav = 1`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/followuser', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.targetEmail.split('@')[0]
        connection.query(`insert into follower values('${id}', '${tid}', 0)`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/unfollowuser', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.targetEmail.split('@')[0]
        connection.query(`delete from follower where userid = '${id}' and followerid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/favuser', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.targetEmail.split('@')[0]
        connection.query(`update follower set isFav = 1 where userid = '${id}' and followerid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/unfavuser', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.targetEmail.split('@')[0]
        connection.query(`update follower set isFav = 0 where userid = '${id}' and followerid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/togglefavuser', function (req, res) {
        var id = req.body.email.split('@')[0]
        var tid = req.body.targetEmail.split('@')[0]
        connection.query(`update follower set isFav = !isFav where userid = '${id}' and followerid = '${tid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/followgroup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`insert into usergroup_user values('${req.body.groupid}', '${id}', 0)`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/unfollowgroup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`delete from usergroup_user where userid = '${id}' and usergroupid = '${req.body.groupid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/favgroup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`update usergroup_user set isFav = 1 where userid = '${id}' and usergroupid = '${req.body.groupid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/unfavgroup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`update usergroup_user set isFav = 0 where userid = '${id}' and usergroupid = '${req.body.groupid}''`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/togglefavgroup', function (req, res) {
        var id = req.body.email.split('@')[0]
        connection.query(`update usergroup_user set isFav = !isFav where userid = '${id}' and usergroupid = '${req.body.groupid}'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/searchuser', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select *, (select count(*) from follower where userid = '${id}' and followerid = u.id) as follow from user as u where (id like '%${req.query.query}%' or nickname like '%${req.query.query}%' or email = '${req.query.query}') and searchable = true`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/searchgroup', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select *, (select count(*) from follower where userid = '${id}' and followerid = u.id) from usergroup where id like '%${req.query.query}%' or nickname like '%${req.query.query}%'`, (err, results, fields) => {
            if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.get('/groupuserlist', function (req, res) {
        connection.query(`select u.* from usergroup_user as g join user as u on g.userid = u.id where g.usergroupid = '${req.query.groupid}'`, (err, results, fields) => {
            if (results.length == 0) res.status(201).send('no result')
            else if (err) res.status(201).json({ error: err })
            else res.status(200).json({ data: results })
        })
    })

    app.post('/group', function (req, res) {
        cnt = 0
        connection.query(`insert into usergroup values('${req.body.nickname}', '${req.body.nickname}')`, (err, results, fields) => {
            if (err) {
                res.status(201).json({ error: err })
            }
        })
        if (typeof (req.body.userid) === typeof ('')) {
            connection.query(`insert into usergroup_user values('${req.body.nickname}', '${req.body.userid}', 0)`, (err, results, fields) => {
                if (err) {
                    res.status(201).json({ error: err })
                } else {
                    res.status(200).json({ data: results })
                }
            })
        }
        else {
            for (let i = 0; i < req.body.userid.length; i++) {
                connection.query(`insert into usergroup_user values('${req.body.nickname}', '${req.body.userid[i]}', 0)`, (err, results, fields) => {
                    if (err) {
                        res.status(201).json({ error: err })
                    } else {
                        cnt += 1
                        if (cnt == req.body.userid.length)
                            res.status(200).json({ data: results })
                    }
                })
            }
        }
    })

    return router
}
