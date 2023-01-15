// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import { withIronSessionApiRoute } from "iron-session/next";

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

export default withIronSessionApiRoute(
    async function handler(req,res){
        req.session.user ? console.log(req.session.user) : console.log(2)
        // req.session.user = {
        //     id: 230,
        //     admin: true,
        // };
        await req.session.save();
        res.send({ ok: true });
    },
    {
      cookieName: "cookie_cookie",
      password: "DAj5CTuS%R08K#DOr!X?dbundefinedMI6m5RA$Egr5^&2T#*Bi@XrkM9UHP^q^IPyhFI2jlPm@WvIN6CX&5lZk2JH3UQ@ifZRundefinedLiMIBSxTJ",
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    },
)
// const handler = async (req:NextApiRequest,res:NextApiResponse)=> {
//   db.query("SELECT * FROM collections", async (err:ErrorHandler, result:collection)=>{
//     return res.status(200).json({result})
//   })
// }


