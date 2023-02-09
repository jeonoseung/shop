const mysql = require('mysql2/promise');
import {Connection,QueryError} from "mysql2/promise";
require('dotenv').config();

export const database = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB,
    multipleStatements:true,
    waitForConnections: true,
    connectionLimit:151,
    queueLimit: 0,
    timezone : "+09:00",
    dateStrings:true
});

export const con=async ()=>{
    return database.getConnection(async (err:QueryError,conn:Connection) => conn);
}


