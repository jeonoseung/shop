import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            const pid = req.query.pid;
            const sql = `SELECT collection_name,collection_router_name,collection_title FROM collections WHERE collection_id = ${pid};`
            const sql2 = `SELECT p.product_id,product_name,brand_name,product_price,product_img,discount_rate
                         FROM collection_product as cp
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         WHERE collection_id = ${pid}`;

            const rows = await database.promise().query(sql+sql2)
            const collection = rows[0][0][0]
            const product = rows[0][1]
            return res.status(200).send({collection:collection,product:product})
    }
    return res.status(400).end
}