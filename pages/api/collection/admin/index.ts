import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import {replaceString} from "../../../../src/function/public/public";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const {search,page,length} = req.query
        const sql = `SELECT c.collection_id,collection_name,collection_router_name,collection_title,COUNT(cp.collection_id) as count,IF(COUNT(rec.rec_id)=0,false,true) as isUse
                     FROM collections as c
                     LEFT JOIN recommend_collection as rec ON rec.collection_id = c.collection_id
                     INNER JOIN collection_product as cp ON cp.collection_id = c.collection_id
                     WHERE (collection_name LIKE "%${search ? replaceString(search as string) : ''}%" or collection_router_name LIKE "%${search ? replaceString(search as string) : ''}%")
                     GROUP BY cp.collection_id
                     LIMIT ${length} OFFSET ${(parseInt(page as string)-1) * parseInt(length as string)};`
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
    switch(req.method){
        case "GET":
            await get(req,res)
            break;
    }
    return res.status(405).end()
}