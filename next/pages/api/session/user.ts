import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/IronSession/options";


export default withIronSessionApiRoute(
    async function handler (req:NextApiRequest,res:NextApiResponse){
        if(req.method === "GET")
        {
            if(req.session.user)
            {
                res.status(200).send({state:true})
            }
            else
            {
                res.status(200).send({state:false})
            }
        }
    },
    IronSessionOption
)
