const twilio = require('./twilio');
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'kakashisensai',
    database: 'onetimepw'
});

module.exports = function(req,res){
    if(!req.body.phone){
        return res.status(422).send({error:'You must send phone number'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g,'');
    //phone number should have country code too '+92xxxxxxxx'
    //from number is from the dummy number given by twilio

    const code = Math.floor(Math.random()*8999+1000);
    twilio.messages.create({
        body:'Your code is '+code,
        to:'+'+phone,
        from:'+12602154012'
    },(err)=>{
        if(err){
            res.send('Phone number not found')
        }else{
            pool.query('INSERT INTO `user_phone_numbers`(`phone`,`code`,`code_valid`) VALUES(?,?,?)', [phone,code,true], function (error, results, fields) {
                if (error) throw error;
                else res.send('user registered successfully!')
            });
        }
    })

}