import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    const pid = req.query.pid;
    const sql = `SELECT collection_name,collection_router_name,collection_title FROM collections WHERE collection_id = ${pid};`
    const sql2 = `SELECT p.product_id,product_name,brand_name,product_price,product_img,discount_rate
                         FROM collection_product as cp
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         WHERE collection_id = ${pid}`;

    const rows = await connection.query(sql+sql2)
    const collection = rows[0][0][0]
    const product = rows[0][1]
    connection.release();
    return res.status(200).send({collection:collection,product:product})
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}