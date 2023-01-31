import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            if(typeof req.query.list !== "string") return res.status(400).send({msg:'need cart'})
            const list = !req.query.list ? [] : JSON.parse(req.query.list);
            const product_id = list.map((item:{product:string,count:number})=>item.product)
            const product = String(product_id);
            const sql = `SELECT product_id,product_name,product_price,discount_rate,product_img,product_title,storage_type ,brand_name
                         FROM products 
                         WHERE product_id IN (${product})`
            const [rows] = await database.promise().query(sql)
            return res.status(200).send(rows)
    }
    return res.status(405).end()
}