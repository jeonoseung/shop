import { withIronSessionApiRoute } from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    console.log(JSON.parse(req.cookies.cart as string))
    return res.status(200).send('')
}

// export default withIronSessionApiRoute(
//     async function handler(req,res){
//         req.session.destroy();
//         res.send({ ok: true });
//     },
//     IronSessionOption
// )

