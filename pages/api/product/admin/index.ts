import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {page,search,length} = req.query
        const sql = `SELECT product_id,product_name,brand_name,product_price,discount_rate,product_title,product_img
                     FROM products `
        const like = `WHERE (product_name LIKE '%${search}%' or brand_name LIKE '%${search}%') `
        const limit = `LIMIT ${length} OFFSET ${(parseInt(page as string)-1)*parseInt(length as string)} `
        const order = `ORDER BY product_id desc `
        const [rows] = await connection.query(search ? (sql+like+order+limit) : (sql+order+limit))
        return res.status(200).send(rows)
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