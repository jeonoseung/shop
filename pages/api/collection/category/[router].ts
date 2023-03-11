import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import {replaceString} from "../../../../src/function/public/public";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const {router} = req.query
    const sql = `SELECT ca.category_id,category_name,COUNT(ca.category_id) as counting
                    FROM collection_product as cp
                    INNER JOIN collections as c ON cp.collection_id = c.collection_id
                    INNER JOIN products as p ON cp.product_id = p.product_id
                    INNER JOIN category as ca ON ca.category_id = p.category_id
                    WHERE c.collection_router_name = "${replaceString(router as string)}"
                    GROUP BY ca.category_id
                    ORDER BY category_name`;
    const [rows] = await connection.query(sql)
    connection.release()
    return res.status(200).send(rows)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
           await get(req,res)
    }
    return res.status(405).end
}