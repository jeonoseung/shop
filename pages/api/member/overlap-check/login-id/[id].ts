import type { NextApiRequest, NextApiResponse } from 'next'
import {con} from "../../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const sql = `SELECT user_login_id FROM user WHERE user_login_id = '${req.query.id}'`
        const [rows] = await connection.query(sql)
        connection.release()
        if(rows.length !== 0) return res.status(200).json({overlap:true})
        else return res.status(200).json({overlap:false})
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch (req.method){
        case "GET":
            await get(req,res)
    }
}

