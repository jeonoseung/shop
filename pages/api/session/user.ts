import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {con} from "../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const sql = `SELECT COUNT(product_id) as count 
                        FROM cart 
                        WHERE user_id = ${req.session.user.id} 
                        GROUP BY product_id`
        const [row] = await connection.query(sql)
        const user = req.session.user;
        const cart = row ? row.length : 0
        connection.release()
        return res.status(200).send({user,cart})
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default withIronSessionApiRoute(
    async function handler (req:NextApiRequest,res:NextApiResponse){
        if(req.method === "GET")
        {
            if(req.session.user)
            {
                await get(req,res)
            }
            else
            {
                return res.status(200).send(req.session.user)
            }
        }
        else{
            return res.status(405).end()
        }
    },
    IronSessionOption
)
