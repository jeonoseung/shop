// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import {RowDataPacket} from "mysql2";
import {database} from "../../../../../src/db/db";



export default function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method === "GET")
    {
        const sql = `SELECT user_login_id FROM user WHERE user_login_id = '${req.query.id}'`
        database.query(sql, async (err:ErrorHandler, result:RowDataPacket)=>{
            if(result.length !== 0)
                return res.status(200).json({overlap:true})
            else
                return res.status(200).json({overlap:false})
        })
    }
}

