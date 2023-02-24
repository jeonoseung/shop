import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const ca = `SELECT category_id,category_name FROM category;`
        const pr = `SELECT product_id,product_name,brand_name,product_img,category_id FROM products;`

        const [[category,product]] = await connection.query(ca+pr)
        connection.release()
        return res.status(200).send({category,product})
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
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