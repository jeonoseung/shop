import { withIronSessionApiRoute } from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";
import {CartCookie, CartListType} from "cart-type";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        if(req.session.user){
            const sql = `SELECT p.product_id,p.product_name,p.product_price,p.discount_rate,p.product_img,p.product_title,p.storage_type,p.brand_name,COUNT(c.product_id) as count
                         FROM products as p
                         INNER JOIN cart as c ON c.product_id = p.product_id
                         WHERE c.user_id = ${req.session.user.id}
                         GROUP BY p.product_id`
            const [rows] = await connection.query(sql)
            return res.status(200).send(rows)
        }
        else{
            const {cart} = req.cookies;
            if(!cart){
                return res.status(200).send([])
            }
            const cartList = JSON.parse(cart)
            const in_pid = cartList.map((li:CartCookie)=>li.product)
            const sql = `SELECT product_id,product_name,product_price,discount_rate,product_img,product_title,storage_type,brand_name
                         FROM products 
                         WHERE product_id IN (${String(in_pid)})`
            const [rows] = await connection.query(sql)
            const result = rows.map((li:CartListType)=>{
                const [filter] = cartList.filter((lj:CartCookie)=>lj.product === li.product_id);
                return {...li,count:filter.count}
            })
            return res.status(200).send(result)
        }
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        /** 상품 식별 번호,개수 */
        const {pid,count} = req.body
        /** 유저 식별 번호 */
        const {id} = req.session.user;

        const insert = `INSERT INTO cart(product_id,user_id) VALUES`
        /** insert sql values 설정 */
        let values = ''
        for(let i=0;i<count;i++){
            values += `(${pid},${id})` + (i===count-1 ? ';' : ',')
        }
        await connection.query(insert+values)
        connection.release()
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
            case "GET":
                await get(req,res)
                break;
            case "POST":
                await post(req,res)
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)