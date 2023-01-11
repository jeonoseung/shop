// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
const db = require('../../src/db/db')
type Data = {
  name: string
}
interface collection{
  collection_id:number
  collection_title:string
  collection_name:string
  collection_subtitle:string
}

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  db.query("SELECT * FROM collections", async (err:ErrorHandler, result:collection)=>{
    return res.status(200).json({result})
  })
}

