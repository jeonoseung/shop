import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const keyword = req.query.keyword;
        const sql = `SELECT p.category_id,category_name,count(category_name) as counting
                FROM products as p
                INNER JOIN category as c ON p.category_id = c.category_id
                WHERE (product_name LIKE '%${keyword}%'
                OR brand_name LIKE '%${keyword}%')
                GROUP BY p.category_id
                ORDER BY category_name`
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