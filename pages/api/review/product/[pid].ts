import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {pid,page,offset} = req.query;
        const LIMIT = parseInt(offset as string)
        const OFFSET = (parseInt(page as string)-1)*LIMIT
        const sql = `SELECT review_id,review_img,review_comment,p.product_name,review_date,user_name
                        FROM review as r
                        INNER JOIN products as p ON p.product_id = r.product_id
                        INNER JOIN purchase_history as ph ON ph.ph_id = r.ph_id
                        INNER JOIN user as u ON ph.user_id = u.user_id
                        WHERE p.product_id = ${pid}
                        LIMIT ${LIMIT} OFFSET ${OFFSET};`
        const [rows] = await connection.query(sql)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}