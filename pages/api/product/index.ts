import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";
import fs from 'fs';
import * as formidable from "formidable";
import {DateTimeNow} from "../../../src/function/public/date";


export const config = {
    api:{
        bodyParser:false
    }
}

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const sql = 'SELECT product_id,product_name,product_img,brand_name,category_id,product_price,discount_rate,product_title FROM products'
        const [rows] = await connection.query(sql);
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}

const post = async(req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const form = new formidable.IncomingForm();
        await form.parse(req,async (err,fields,files)=>{
            if (typeof fields.data !== "string" || typeof fields.option !== "string") {return false}
            const src = await saveFile(files.file);
            const data = JSON.parse(fields.data);
            const option = JSON.parse(fields.option);
            const user = fields.user;
            const sql = `INSERT INTO products(
                                 product_name, brand_name, product_title,
                                 product_price, product_img, discount_rate, 
                                 category_id, date, storage_type, 
                                 delivery_type,user_id)
                                 VALUE(
                                 '${data.name}', '${data.brand}', 
                                 '${data.title}', ${data.price.split(',').join('')}, 
                                 '${src}', ${data.sale}, ${data.category}, '${DateTimeNow()}', 
                                 '${data.storage_type}', '${data.delivery_type}',${user});`;
            const result = await connection.query(sql);

            let sql2 = `INSERT INTO product_option(po_name,po_content,product_id,po_order) VALUES`;
            option.map((item:{title:string,content:string},index:number)=>{
                sql2 += `('${item.title}','${item.content}',${result[0].insertId},${index})`;
                option.length-1 === index ? sql2 += ';' : sql2 += ','
            })
            await connection.query(sql2)
        })
        connection.release()
        return res.status(201).end()
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}
const saveFile = async (file:any)=>{
    const data = fs.readFileSync(file.filepath);
    const ex = file.originalFilename.split('.');
    const src = `/product/p-img-${Date.now()}.${ex[ex.length-1]}`;
    fs.writeFileSync(`./public${src}`,data);
    return src
}
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            await get(req,res)
            break;
        case "POST":
            await post(req,res)
            break;
    }
    return res.status(405).end()
}