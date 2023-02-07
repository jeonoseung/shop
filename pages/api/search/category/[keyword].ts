import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const keyword = req.query.keyword;
    const sql = `SELECT p.category_id,category_name,count(category_name) as counting
                FROM products as p
                INNER JOIN category as c ON p.category_id = c.category_id
                WHERE (product_name LIKE '%${keyword}%'
                OR brand_name LIKE '%${keyword}%'
                OR category_name LIKE '%${keyword}%')
                GROUP BY p.category_id
                ORDER BY category_name`
    const [rows] = await database.promise().query(sql)

    return res.status(200).send(rows)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}