var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'kakashisensai',
    database: 'onetimepw'
});


module.exports = async (req, res) => {

        //Verify the user provided a phone
        if (!req.body.phone) {
            res.send({status:'do not exist'}) 
        }

        //Format the phone number to remove dashes or parenthesis

        //this first converts the numbers to string and then removes dashes & parenthesis
        const phone = String(req.body.phone).replace(/[^\d]/g, "");
        const code = String(req.body.code).replace(/[^\d]/g, "");

        //Checking if phone number exists
        var phone_list = []
        pool.query('SELECT * FROM `onetimepw`.`user_phone_numbers` WHERE phone=? && code = ?',[phone,code], function (error, results, fields) {
            // console.log(results)
            phone_list = results
            if (error) { console.log(error);res.send({status:'Wrong code!'}) }
            
            else {

                let repeat = false
                if(phone_list.length>0){
                    phone_list.map(item => {
                        if (item.phone == phone && item.code ==code) {
                            res.send({status:'exists',token:item.jwt})
                        } else {
                            res.send({status:'Wrong code!'})
                        }
                    })
                }else{
                    res.send({status:'Wrong code!'})
                }
                

            }
        })




}