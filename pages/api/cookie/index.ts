import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    res.setHeader("cookie",'cookie')
    return res.status(200).send(1)
}