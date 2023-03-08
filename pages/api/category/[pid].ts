
import type { NextApiRequest, NextApiResponse } from 'next'
import {con} from "../../../src/db/db";


const get =async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {pid} = req.query
        const sql = `SELECT category_name,COUNT(p.category_id) as count
                        FROM category as c
                        LEFT JOIN products as p ON c.category_id = p.category_id
                        WHERE c.category_id = ${pid}
                        GROUP BY c.category_id`;
        const [[row]] = await connection.query(sql)
        connection.release()
        return res.status(200).send(row)
    }catch (err){
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch (req.method){
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}
