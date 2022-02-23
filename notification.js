module.exports = function (app, connection) {
    var express = require('express')
    var router = express.Router()

    
    app.get('/notification', function (req, res) {
        var id = req.query.email.split('@')[0]
        connection.query(`select f.*, u.* from notification_follow as f join user as u on f.senderid = u.id where userid = '${id}'`, (err, results, fields) => {
            if (err) res.json({ error: err })
            else res.status(200).json({ data: results })
        })
    })
    
    return router
}
