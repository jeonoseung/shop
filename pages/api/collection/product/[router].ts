import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    try{
        const query = req.query
        const router = query.router
        const filter = query.filter
        const sort = query.sort
        const page = query.page ? parseInt(query.page as string) : 1
        const listLength = parseInt(query.list as string);
        const sql = `SELECT p.product_id,product_name,brand_name,product_price,product_img,discount_rate,delivery_type,product_title,p.category_id
                         FROM collection_product as cp
                         INNER JOIN collections as c ON cp.collection_id = c.collection_id
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         LEFT JOIN purchase_history as ph ON ph.product_id = p.product_id
                         WHERE c.collection_router_name = '${router}'
                         `;
        const sqlFilter = (filter !== 'all' && filter !== undefined ? 'AND p.category_id IN ('+filter+') ':' ');
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
        const [rows] = await database.promise().query(sql+sqlFilter+groupby+sqlSort+pagination)
        if(rows.length === 0)
        {
            const [rows] = await database.promise().query(sql+groupby+sqlSort+pagination)
            return res.status(200).send(rows)
        }
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end
}