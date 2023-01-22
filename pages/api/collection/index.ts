import {NextApiRequest, NextApiResponse} from "next";
import {PostType} from "../../../src/@types/collection/collection-add";
import {database} from "../../../src/db/db";


const post = async (body:PostType) =>{
    const set = body.set;
    const product = body.product
    const sql = `INSERT INTO collections(collection_name,collection_router_name,collection_title) 
                             VALUE('${set.name}','${set.router.replace(' ', '-')}','${set.title}')`
    const [insert] = await database.promise().query(sql)
    let sql2 = `INSERT INTO collection_product(collection_id,product_id) `
    product.map((item,index)=>{
        sql2 += index === 0 ? `VALUES` : ``
        sql2 += `(${insert.insertId},${item.product_id})`
        sql2 += index === product.length-1 ? `;` : `,`
    })
    await database.promise().query(sql2)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        switch (req.method)
        {
            case "GET":
                
                break;
            case "POST":
                await post(req.body)
                return res.status(204).end()
            case "PUT":
                break;
            case "DELETE":
                break;
        }
        return res.status(400).send('incorrect method')
    }catch (err)
    {
        return res.status(500).end()
    }
}