import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import {replaceString} from "../../../../src/function/public/public";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const query = req.query;
        const {keyword,filter,sort} = query
        const page = query.page ? parseInt(query.page as string) : 1
        const listLength = parseInt(query.list as string);

        const sql = `SELECT p.product_id,p.product_name,brand_name,product_price,product_img,discount_rate,delivery_type,product_title,p.category_id
                FROM products as p
                INNER JOIN category as c ON p.category_id = c.category_id
                LEFT JOIN purchase_history as ph ON ph.product_id = p.product_id 
                WHERE (p.product_name LIKE "%${replaceString(keyword as string)}%" OR brand_name LIKE "%${replaceString(keyword as string)}%") `
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
        const pagination = `LIMIT ${listLength} OFFSET ${listLength*(page-1)}`;
        const [rows] = await connection.query(sql+sqlFilter+groupby+sqlSort+pagination)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).send('get-try-catch')
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