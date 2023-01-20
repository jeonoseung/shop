import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from "../../../src/db/db";

export const config = {
    api:{
        bodyParser:false
    }
}

async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            const sql = `SELECT * FROM products WHERE product_id = '${req.query.id}';`;
            const sql2 = `SELECT * FROM product_option WHERE product_id = '${req.query.id}'`
            const [data] = await database.promise().query(sql)
            const [option] = await database.promise().query(sql2)
            return res.status(200).send({info:data[0],option:option})
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }
    return res.status(400).send('incorrect method')
}

export default handler