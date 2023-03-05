import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try {
        const sql = `SELECT p.product_id,product_name,brand_name,product_price,discount_rate,product_img,COUNT(review_id) as review
                        FROM products as p
                        INNER JOIN rec_products as rp ON p.product_id = rp.product_id
                        LEFT JOIN review as r ON p.product_id = r.product_id
                        GROUP BY p.product_id`;
        const [rows] = await connection.query(sql)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}