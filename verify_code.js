var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'kakashisensai',
    database: 'onetimepw'
});


module.exports = async (req, res) => {
    return new Promise((resolve, reject) => {
        //this first converts the numbers to string and then removes dashes & parenthesis
        const phone = String(req.body.phone).replace(/[^\d]/g, "");
        const code = String(req.body.code).replace(/[^\d]/g, "");

        //Create a new user account using phone number
        pool.query('SELECT * FROM `onetimepw`.`user_phone_numbers` WHERE code = ? && phone = ?', [code, phone], function (error, results, fields) {
            if (error) { resolve('ERROR')}
            else {
                if (results.length == 0) {
                    // res.send('Wrong code')
                    resolve('WRONG_CODE')
                }
                else {
                    pool.query('SET SQL_SAFE_UPDATES = 0')
                    pool.query('UPDATE user_phone_numbers SET code_valid = 0 WHERE phone = ?', [phone], function (error, results, fields) {
                        if (error) {
                            // res.send('Could not Verify the code')
                            resolve('COULDNT_VERIFY_CODE')
                        }
                        else {
                            
                            resolve('VERIFIED')

                        }

                    })


                }
            }
        });
    }).then((result)=>{return result})


}