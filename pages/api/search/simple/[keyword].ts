import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {keyword} = req.query;
        const sql = `SELECT product_id,product_name,brand_name 
                        FROM products 
                        WHERE (product_name LIKE '%${keyword}%' or brand_name LIKE '%${keyword}%')
                        LIMIT 5`
        const [rows] = await connection.query(sql)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).send('get-try-catch')
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