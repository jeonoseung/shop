import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const sql = `SELECT c.collection_id,collection_router_name,collection_title,COUNT(c.collection_id) as count
                     FROM collections as c
                     INNER JOIN collection_product as cp ON cp.collection_id = c.collection_id
                     GROUP BY c.collection_id`
        const [rows] = await connection.query(sql)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}