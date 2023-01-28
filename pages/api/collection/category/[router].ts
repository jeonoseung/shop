import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../../src/db/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            const {router} = req.query
            const sql = `SELECT p.category_id,category_name,COUNT(category_name) as counting
                    FROM collection_product as cp
                    INNER JOIN collections as c ON cp.collection_id = c.collection_id
                    INNER JOIN products as p ON cp.product_id = p.product_id
                    INNER JOIN category as ca ON ca.category_id = p.category_id
                    WHERE c.collection_router_name = '${router}'
                    GROUP BY p.category_id
                    ORDER BY category_name`;
            const [rows] = await database.promise().query(sql)
            return res.status(200).send(rows)
    }
    return res.status(405).end
}