import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
// WHERE (product_name LIKE '%%' or brand_name '%%')
const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {page,search} = req.query
        const sql = `SELECT product_id,product_name,brand_name,product_price,discount_rate,product_title,product_img
                     FROM products `
        const like = `WHERE (product_name LIKE '%${search}%' or brand_name LIKE '%${search}%') `
        const limit = `LIMIT ${10} OFFSET ${(parseInt(page as string)-1)*10}`
        const [rows] = await connection.query(search ? (sql+like+limit) : (sql+limit))
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