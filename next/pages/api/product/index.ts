import {NextApiRequest, NextApiResponse} from "next";
const db = require('../../../src/db/db')

async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            const sql = 'SELECT * FROM products'
            const [rows] = await db.promise().query(sql);
            res.status(200).send(rows)
            break;
        case "POST":
            break;
        case "PUT":
            res.status(405)
            break;
        case "DELETE":
            break;
    }
}
export default handler