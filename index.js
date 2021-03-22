var express = require('express');
var verify_code = require('./verify_code');
var if_user_exists = require('./if_user_exists');
var request_one_time_password = require('./request_one_time_password');
var jwt_saveNsend = require('./jwt_saveNsend');
var check_code = require('./check_code');

var app = express()
app.use(express.json())

app.post('/create_user', async (req, res) => {

    var resp = await if_user_exists(req, res)
    if (resp == 'DONT_EXISTS') {
        var resp = await request_one_time_password(req, res)
    } else if (resp == "EXISTS") {
        res.send('already exists')
    } else if (resp == "ERROR") {
        res.send('Error')
    } else {
        res.send('Bad Input')
    }

})

app.post('/login', async (req, res) => {

    var resp = await if_user_exists(req, res)
    if (resp == 'DONT_EXISTS') {
        res.send({status:'user do not exist'})
    } else if (resp == "EXISTS") {
        check_code(req, res)
    } else if (resp == "ERROR") {
        res.send({status:'Error'})
    } else {
        res.send({status:'Bad Input'})
    }

})

app.post('/verify_code', async (req, res) => {
    var resp = await verify_code(req, res)
    if (resp == 'VERIFIED') {
        jwt_saveNsend(req, res)
    }
    else if (resp == 'COULDNT_VERIFY_CODE') {
        res.send({status:'COULDNT_VERIFY_CODE'})
    }
    else if (resp == 'WRONG_CODE') {
        res.send({status:'Wrong Code'})
    }
    else {
        res.send({status:'Error'})
    }
})

app.get('/', async (req, res) => {
    res.send('running')
})

app.listen('3000')



