// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {con} from "../../../src/db/db";


interface category{
    category_id:number
    category_name:string
}

const get =async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const [rows] = await connection.query("SELECT * FROM category")
    connection.release()
    return res.status(200).json({rows})
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch (req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}
