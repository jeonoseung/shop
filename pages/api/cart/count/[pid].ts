import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from "../../../../src/function/api/iron-session/options";

const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {pid} = req.query;
        const {id} = req.session.user;
        if(!id) return res.status(401)
        const sql = `INSERT INTO cart(user_id,product_id) VALUE(${id},${pid})`
        await connection.query(sql)
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {pid} = req.query;
        const {id} = req.session.user;
        if(!id) return res.status(401)
        const sql = `DELETE c
                     FROM cart c
                     INNER JOIN(SELECT cart_id FROM cart 
                     WHERE product_id = ${pid} AND user_id=${id} ORDER BY cart_id desc LIMIT 1) temp on temp.cart_id = c.cart_id;`
        await connection.query(sql)
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default withIronSessionApiRoute(
    async function handler(req,res){
        switch (req.method){
            case "POST":
                await post(req,res)
                break;
            case "DELETE":
                await Delete(req,res)
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)