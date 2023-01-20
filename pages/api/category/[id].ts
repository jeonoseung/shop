// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import {database} from "../../../src/db/db";


interface category{
    category_id:number
    category_name:string
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const [rows] = await database.promise().query("SELECT * FROM category")
    return res.status(200).json({rows})
}
