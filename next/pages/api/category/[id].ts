// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
const db = require('../../../src/db/db')

interface category{
    category_id:number
    category_name:string
}

export default function handler(req:NextApiRequest,res:NextApiResponse) {
    db.query("SELECT * FROM category", async (err:ErrorHandler, result:category[])=>{
        return res.status(200).json({result})
    })
}
