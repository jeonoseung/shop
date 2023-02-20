import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        /** 삭제 상품 아이디 */
        const {pid} = req.query
        /** 상품 아이디에 속하는 장바구니 목록 삭제 */
        const sql = `DELETE c FROM cart c INNER JOIN(SELECT cart_id FROM cart WHERE product_id = ${pid}) temp ON temp.cart_id = c.cart_id`
        await connection.query(sql)
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "DELETE":
            await Delete(req,res)
            break;
    }
    return res.status(405).end()
}