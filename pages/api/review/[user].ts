import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {user} = req.query;
        const write_sql = `SELECT p.product_id,p.product_name,review_comment,review_img,review_date,p.brand_name
                            FROM purchase_history as ph
                            INNER JOIN products as p ON ph.product_id = p.product_id
                            INNER JOIN review as r ON ph.ph_id = r.ph_id
                            WHERE ph.user_id = ${user}
                            AND ph.review_state = 1
                            ORDER BY review_date desc;`
        const unwritten_sql = `SELECT ph.ph_id,p.product_name,p.product_id,p.product_img,phg.order_date,p.brand_name
                            FROM purchase_history as ph
                            INNER JOIN products as p ON ph.product_id = p.product_id
                            INNER JOIN purchase_history_group as phg ON phg.phg_id = ph.phg_id
                            WHERE ph.user_id = ${user}
                            AND ph.review_state = 0
                            AND phg.order_date > date_add(now(),interval -7 day);`
        const [rows] = await connection.query(write_sql+unwritten_sql)
        const [write,unwritten] = rows
        connection.release()
        return res.status(200).send({write,unwritten})
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