// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import { withIronSessionApiRoute } from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";

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
        req.session.destroy();
        res.send({ ok: true });
    },
    IronSessionOption
)

