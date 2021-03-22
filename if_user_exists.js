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
        //Verify the user provided a phone
        if (!req.body.phone) {
            resolve('BAD_INPUT')
        }

        //Format the phone number to remove dashes or parenthesis

        //this first converts the numbers to string and then removes dashes & parenthesis
        const phone = String(req.body.phone).replace(/[^\d]/g, "");

        //Checking if phone number exists
        var phone_list = []
        pool.query('SELECT * FROM `onetimepw`.`user_phone_numbers`', function (error, results, fields) {
            // console.log(results)
            phone_list = results
            if (error) { console.log(error);resolve("ERROR")  }
            else {

                let repeat = false
                phone_list.map(item => {
                    if (item.phone == phone) {
                        repeat = 'EXISTS'
                        resolve(repeat) 
                    } else {
                        repeat = 'DONT_EXISTS'
                    }
                })
                resolve(repeat) 

            }
        })

    }).then(result => { return result })



}