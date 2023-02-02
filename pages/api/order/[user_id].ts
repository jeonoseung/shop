import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from '../../../src/function/api/iron-session/options'

export default withIronSessionApiRoute(
    async function handler(req:NextApiRequest,res:NextApiResponse){
        if(!req.session.user)
        {
            return res.status(403).send({msg:'need login'})
        }
        switch (req.method)
        {
            case "GET":

                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)
