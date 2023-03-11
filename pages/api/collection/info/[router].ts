import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import {replaceString} from "../../../../src/function/public/public";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const router = req.query.router as string;
        const filter = req.query.filter;
        const sql = `SELECT c.collection_name,COUNT(c.collection_name) as list_count
                         FROM collection_product as cp
                         INNER JOIN collections as c ON cp.collection_id = c.collection_id
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         WHERE c.collection_router_name = "${replaceString(router)}"`;
        const sqlFilter = (filter !== 'all' && filter !== undefined ? 'AND p.category_id IN ('+filter+') ':' ');
        const groupBy = 'GROUP BY c.collection_name '
        const [rows] = await connection.query(sql+sqlFilter+groupBy).catch((err:ErrorHandler)=>console.log(err))
        connection.release()
        return res.status(200).send(rows[0])
    }catch (err){
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}