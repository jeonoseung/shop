import {NextApiRequest, NextApiResponse} from "next";
import {PostType} from "collection-type";

import {con} from "../../../src/db/db";


const post = async (body:PostType,req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const set = body.set;
    const product = body.product
    const sql = `INSERT INTO collections(collection_name,collection_router_name,collection_title) 
                             VALUE('${set.name}','${set.router.replace(' ', '-')}','${set.title}')`
    const [insert] = await connection.query(sql)
    let sql2 = `INSERT INTO collection_product(collection_id,product_id) `
    product.map((item,index)=>{
        sql2 += index === 0 ? `VALUES` : ``
        sql2 += `(${insert.insertId},${item.product_id})`
        sql2 += index === product.length-1 ? `;` : `,`
    })
    await connection.query(sql2)
    connection.release()
    return res.status(204).end()
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        switch (req.method)
        {
            case "POST":
                await post(req.body,req,res)
        }
        return res.status(405).end()
    }catch (err)
    {
        return res.status(500).end()
    }
}