import type { NextApiRequest, NextApiResponse } from 'next'
import {con} from "../../../src/db/db";

export const config = {
    api:{
        bodyParser:false
    }
}

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const sql = `SELECT product_id,product_name,brand_name,product_title,product_price,product_img,discount_rate,storage_type,delivery_type,u.user_name
                         FROM products as p
                         INNER JOIN user as u
                         ON p.user_id = u.user_id
                         WHERE product_id = '${req.query.id}';`;
        const sql2 = `SELECT * FROM product_option WHERE product_id = '${req.query.id}'`
        const [data] = await connection.query(sql)
        const [option] = await connection.query(sql2)
        connection.release()
        return res.status(200).send({info:data[0],option:option})
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}