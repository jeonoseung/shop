import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    if(typeof req.query.list !== "string") return res.status(400).send({msg:'need cart'})
    const connection = await con()
    const list = !req.query.list ? [] : JSON.parse(req.query.list);
    const product_id = list.map((item:{product:string,count:number})=>item.product)
    const product = String(product_id);
    const sql = `SELECT product_id,product_name,product_price,discount_rate,product_img,product_title,storage_type ,brand_name
                         FROM products 
                         WHERE product_id IN (${product})`
    const [rows] = await connection.query(sql)
    connection.release();
    return res.status(200).send(rows)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}