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
            const sql = `SELECT product_id,product_name,brand_name,product_title,product_price,product_img,discount_rate,storage_type,delivery_type,u.user_name
                         FROM products as p
                         INNER JOIN user as u
                         ON p.user_id = u.user_id
                         WHERE product_id = '${req.query.id}';`;
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