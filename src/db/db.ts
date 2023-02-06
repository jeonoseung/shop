
const mysql = require('mysql2')

import {createPool,Pool} from "mysql2/promise";


require('dotenv').config();

//
// export async function connect(): Promise <Pool> {
//     const database = await createPool({
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT as string),
//         database: process.env.DB,
//         multipleStatements:true,
//         waitForConnections: true,
//         connectionLimit:20,
//         queueLimit: 0,
//         timezone : "+09:00",
//         dateStrings:true
//     });
//     return database;
// }
export const database = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB,
    multipleStatements:true,
    waitForConnections: true,
    connectionLimit:20,
    queueLimit: 0,
    timezone : "+09:00",
    dateStrings:true
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

