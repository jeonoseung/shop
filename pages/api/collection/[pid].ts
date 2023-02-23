import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";
import {removeFile} from "../../../src/function/public/file";


const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const pid = req.query.pid;
        const sql = `SELECT collection_name,collection_router_name,collection_title FROM collections WHERE collection_id = ${pid};`
        const sql2 = `SELECT p.product_id,product_name,brand_name,product_price,product_img,discount_rate
                         FROM collection_product as cp
                         INNER JOIN products as p ON cp.product_id = p.product_id
                         WHERE collection_id = ${pid}`;

        const rows = await connection.query(sql+sql2)
        const collection = rows[0][0][0]
        const product = rows[0][1]
        connection.release();
        return res.status(200).send({collection:collection,product:product})
    }catch (err){
        console.log(err)
        connection.release();
        return res.status(500).end()
    }
}
const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {pid} = req.query
        const sql = `SELECT topic_img
                     FROM recommend_collection as rec
                     INNER JOIN recommend_collection_topic as rct ON rec.rec_id = rct.rec_id
                     WHERE rec.collection_id = ${pid}`
        const [rows] = await connection.query(sql)
        await rows.map(async ({rec_image}:{rec_image:string})=>{
             await removeFile(rec_image)
        })
        const call = `CALL collection_delete(${pid});`
        await connection.query(call)
        connection.release()
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}
const put = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {pid} = req.query;
        const {collection,selected}:any = req.query;

        const sql = `UPDATE collections SET collection_name = '${collection.name}',
                                            collection_router_name = '${collection.router_name}'
                                            collection_title = '${collection.title}'
                                            WHERE collection_id = ${pid};`
        const cp_reset = `DELETE cp FROM collection_product cp 
                          INNER JOIN(SELECT cp_id FROM collection_product WHERE collection_id=${pid}) temp ON temp.cp_id = cp.cp_id;`
        const cp_insert = `INSERT INTO collection_product(collection_id,product_id) VALUES`
        const values = selected.reduce((sql:string,li:any,index:number)=>{
            sql += `(${pid},${li.product_id})`+(index === selected.length-1 ? '; ' : ', ')
            return sql
        },'')
        await connection.query(sql+cp_reset+(cp_insert+values))

        connection.release()
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
        case "GET":
            await get(req,res)
            break;
        case "DELETE":
            await Delete(req,res)
            break;
        case "PUT":
            await put(req,res)
            break;
    }
    return res.status(405).end()
}