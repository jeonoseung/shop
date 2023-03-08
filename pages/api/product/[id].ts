import type { NextApiRequest, NextApiResponse } from 'next'
import {con} from "../../../src/db/db";
import fs from "fs";
import * as formidable from "formidable";
import {Files} from "formidable";
import {AdminProductOptionType} from "product-type";


export const config = {
    api:{
        bodyParser:false
    }
}
const saveFile = async (file:any)=>{
    const data = fs.readFileSync(file.filepath);
    const ex = file.originalFilename.split('.');
    const src = `/product/p-img-${Date.now()}.${ex[ex.length-1]}`;
    fs.writeFileSync(`./public${src}`,data);
    return src
}
const removeFile = async (src:string) =>{
    await fs.unlink(`./public${src}`,(err)=>{
        if(err) throw err
    })
}

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {id} = req.query
        const sql = `SELECT product_id,product_name,brand_name,product_title,product_price,product_img,discount_rate,storage_type,delivery_type,u.user_name,category_id
                         FROM products as p
                         INNER JOIN user as u
                         ON p.user_id = u.user_id
                         WHERE product_id = ${id};`;
        const sql2 = `SELECT * FROM product_option WHERE product_id = ${id};`
        const [rows] = await connection.query(sql+sql2)
        const [[info],option] = rows;
        connection.release()
        return res.status(200).send({info,option})
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}
const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {id} = req.query
        const select = `SELECT product_id,product_img FROM products WHERE product_id = ${id}`
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
const put = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {id} = req.query
        const form = new formidable.IncomingForm();
        const result:{data:string,option:string,files:Files} = await new Promise(async (resolve,reject)=>{
            await form.parse(req,async (err,fields,files)=>{
                if (err) return reject(err)
                const {data,option} = fields
                resolve({data:data as string,option:option as string,files})
            })
        })
        const {name,brand,price,sale,title,category,storage_type,delivery_type} = JSON.parse(result.data)
        const option = JSON.parse(result.option)
        const selectProduct = `SELECT product_img FROM products WHERE product_id = ${id}`
        const [[product]] = await connection.query(selectProduct)
        const src:string | undefined = result.files.file ? await saveFile(result.files.file) : undefined
        if(src){
            await removeFile(product.product_img)
        }
        const update = `UPDATE products `
        const set = `SET product_name = '${name}',
                         brand_name = '${brand}',
                         product_price = ${price},
                         discount_rate = ${sale},
                         product_title = '${title}',
                         category_id = ${category},
                         storage_type = '${storage_type}',
                         delivery_type = '${delivery_type}' `+(src ? `,product_img = '${src}' ` : ' ')
        const where = `WHERE product_id = ${id};`
        const deleteOption = `DELETE po
                              FROM product_option po
                              INNER JOIN(SELECT po_id FROM product_option WHERE product_id=${id}) temp on temp.po_id = po.po_id;`
        const values = option.reduce((sql:string,li:AdminProductOptionType,index:number)=>{
            return sql+`('${li.title}','${li.content}',${li.id},${id})${index === option.length-1 ? ';' : ','}`
        },'')
        const insertOption = `INSERT INTO product_option(po_name,po_content,po_order,product_id) VALUES`
        const sql = (update+set+where)+deleteOption+(insertOption+values);
        await connection.query(sql)
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