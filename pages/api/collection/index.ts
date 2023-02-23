import {NextApiRequest, NextApiResponse} from "next";
import {PostType} from "collection-type";
import {con} from "../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const sql = `SELECT collection_id,collection_name FROM collections`
        const [rows] = await connection.query(sql)
        return res.status(200).send(rows)
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

const post = async (body:PostType,req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const set = body.set;
    const product = body.product
    const duplication = `SELECT collection_id 
                         FROM collections 
                         WHERE collection_router_name = '${set.router.replace(' ', '-')}'`
    const [[check]] = await connection.query(duplication)
    if(check){
        return res.status(400).send({msg:'router name',kind:'duplication'})
    }
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
    return res.status(201).end()
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        switch (req.method)
        {
            case "GET":
                await get(req,res)
                break;
            case "POST":
                await post(req.body,req,res)
                break;
        }
        return res.status(405).end()
    }catch (err)
    {
        return res.status(500).end()
    }
}