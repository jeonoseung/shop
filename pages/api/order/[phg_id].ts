import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from '../../../src/function/api/iron-session/options'

export const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    try{
        const user = req.query.user ? req.query.user : req.session.user.id;
        const sql = `SELECT ph.product_id,p.product_name,p.brand_name,p.product_img,p.product_price,p.discount_rate,ph.count,ph.phg_id
                FROM purchase_history AS ph
                INNER JOIN products as p ON p.product_id = ph.product_id
                WHERE ph.phg_id = ${req.query.phg_id}
                AND ph.user_id = ${user}`
        const [rows] = await database.promise().query(sql)
        return rows
    }catch (err){
        console.log(err)
        return false;
    }
}

export default withIronSessionApiRoute(
    async function handler(req:NextApiRequest,res:NextApiResponse){
        if(!req.session.user && !req.query.user)
        {
            return res.status(403).send({msg:'need login'})
        }
        switch (req.method)
        {
            case "GET":
                return res.status(200).send(await get(req,res))
        }
        return res.status(405).end()
    },
    IronSessionOption
)
