var crypto = require('crypto')
const mysql = require('mysql');
// connect db bình thường 
require('dotenv').config

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'wad',
});
;


const password = 'admin1';

function genPassword(password){
    const salt = crypto.randomBytes(32).toString('hex');
    // console.log(req.body)
    crypto.pbkdf2(password, salt, 10000, 32, 'sha256', async function(err, hashedPassword) {
    if (err) {
        return next(err);  // Use next to pass the error to the error-handling middleware
    }

    try {
        // Tạo mới user trong MongoDB
        connection.query(`CALL AddAccount(?, ?, ?, ?, ?, ?, ?)`, ['testing4', hashedPassword.toString('hex'), 'tester4', 'tester4@gmail.com', '', '', salt], (err, result) => {
        if (err) {
            console.log(err)
        }

        console.log(result);
        });
    } catch (err) {
        console.log(err);
    }
    });
}


function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
    console.log(hashVerify, hash)
    return hash === hashVerify;
}


const isValid = validPassword('admin', '66990de3526fcea41d0a824e5e583b053dc8fb28cd480831c0f406cb9231b3ea', '8ac544bfa714fa15eb2014f79a0800b3248719b28d7fb7b6172c2ee2959fd72e')

if(isValid){
    console.log('valid password')
}else{
    console.log('wrong password')
}

// genPassword('admin')