var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'kakashisensai',
    database: 'onetimepw'
});

module.exports = function (req, res) {

    if(!req.body.phone){
        return res.status(422).send({status:'You must send phone number'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g,'');

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz0123456789"
    let jwt = ''
    for (let i = 0; i < 500; i++) {
        jwt = jwt + characters[Math.floor(Math.random() * 62)]
    }
    pool.query('SET SQL_SAFE_UPDATES = 0')
    pool.query('UPDATE user_phone_numbers SET jwt = ? WHERE phone = ?', [jwt,phone], function (error, results, fields) {
        if (error) { res.send({status:'Error'}) }
        else { res.send({ status:"Success",token: jwt }) }
    });
}