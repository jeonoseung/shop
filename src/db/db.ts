
const mysql = require('mysql2')
require('dotenv').config();
export const database = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    multipleStatements:true
});
// try{
//     module.exports = mysql.createConnection({
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         database: process.env.DB
//     });
// }catch (err){
//     console.error(err)
// }

