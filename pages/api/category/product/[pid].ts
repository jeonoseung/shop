import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const query = req.query
        const pid = query.pid
        const sort = query.sort
        const page = query.page ? parseInt(query.page as string) : 1
        const listLength = parseInt(query.listLength as string);
        const sql = `SELECT p.category_id,p.product_id,p.product_name,brand_name,product_price,product_img,discount_rate,delivery_type,product_title
                        FROM category as c
                        INNER JOIN products as p ON c.category_id = p.category_id
                        LEFT JOIN purchase_history as ph ON ph.product_id = p.product_id
                        WHERE c.category_id = ${parseInt(pid as string) ? parseInt(pid as string) : 0} `;
        const groupby = `GROUP BY p.product_id `;
        const sqlSort =
            sort === undefined || sort === '1'
                ? 'order by p.date desc '
                : sort === '2'
                    ? 'order by IFNULL(SUM(ph.count),0) desc '
                    : sort === '3'
                        ? 'order by (p.product_price * (1-p.discount_rate * 0.01)) '
                        : sort === '4'
                            ? 'order by (p.product_price * (1-p.discount_rate * 0.01)) desc '
                            : ' ';
        const pagination = `LIMIT ${listLength} OFFSET ${(listLength*((page < 1 ? 1 : page)-1))}`;
        const [rows] = await connection.query(sql+groupby+sqlSort+pagination)
        if(rows.length === 0)
        {
            const [rows] = await connection.query(sql+sqlSort+pagination)
            connection.release()
            return res.status(200).send(rows)
        }
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