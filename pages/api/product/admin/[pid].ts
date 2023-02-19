import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";
import fs from "fs";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {pid} = req.query
        const select = `SELECT product_id,product_img FROM products WHERE product_id = ${pid}`
        const [rows] = await connection.query(select)
        const {product_img,product_id} = rows[0];
        await fs.unlink(`./public${product_img}`,(err)=>{
            if(err) throw err
        })
        const remove = `DELETE FROM products WHERE product_id = ${product_id}`;
        await connection.query(remove)
        connection.release()
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "DELETE":
            await Delete(req,res)
            break;
    }
    return res.status(405).end()
}