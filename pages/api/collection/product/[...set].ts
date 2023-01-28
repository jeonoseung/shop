import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../../src/db/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            const query:any = req.query.set
            const router = query[0]
            const filter = query[1]
            const sort = query[2]

            const sql = `SELECT p.product_id,product_name,brand_name,product_price,product_img,discount_rate,delivery_type,product_title,p.category_id
                         FROM collection_product as cp
                         INNER JOIN collections as c ON cp.collection_id = c.collection_id
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         WHERE c.collection_router_name = '${router}'`
                + (filter !== 'all' && filter !== undefined ? 'AND p.category_id IN ('+filter+')' : ' ')
                + (sort !== undefined ? 'ORDER BY p.date desc' : ';');
            const [rows] = await database.promise().query(sql)
            return res.status(200).send(rows)
    }
    return res.status(405).end
}