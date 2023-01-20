import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";


export default withIronSessionApiRoute(
    async function handler (req:NextApiRequest,res:NextApiResponse){
        if(req.method === "GET")
        {
            if(req.session.user)
            {
                return res.status(200).send(req.session.user)
            }
            else
            {
                return res.status(200).send(req.session.user)
            }
        }
    },
    IronSessionOption
)
