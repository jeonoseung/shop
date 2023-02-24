import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {pid} = req.query;

        const col = `SELECT collection_name,collection_router_name,collection_title FROM collections WHERE collection_id = ${pid};`
        const col_pr = `SELECT cp.product_id,product_name,product_img,brand_name FROM collections as c 
                                    INNER JOIN collection_product as cp ON c.collection_id = cp.collection_id
                                    INNER JOIN products as p ON cp.product_id = p.product_id
                                    WHERE cp.collection_id = ${pid};`
        const [[[collection],collection_product]] = await connection.query(col+col_pr)
        connection.release()
        return res.status(200).send({collection,collection_product})
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