import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";
import fs from 'fs';
import * as formidable from "formidable";
import DateTimeNow from "../../../src/function/public/date-time-now";


export const config = {
    api:{
        bodyParser:false
    }
}

const post = async(req:NextApiRequest,res:NextApiResponse)=>{
    const form = new formidable.IncomingForm();
    form.parse(req,async (err,fields,files)=>{
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
        const result = await database.promise().query(sql);

        let sql2 = `INSERT INTO product_option(po_name,po_content,product_id,po_order) VALUES`;
        option.map((item:any,index:number)=>{
            sql2 += `('${item.title}','${item.content}',${result[0].insertId},${index})`;
            option.length-1 === index ? sql2 += ';' : sql2 += ','
        })
        database.query(sql2)
        return res.status(200).send({msg:'success'})
    })
}
const saveFile = async (file:any)=>{
    const data = fs.readFileSync(file.filepath);
    const ex = file.originalFilename.split('.');
    const src = `/product/p-img-${Date.now()}.${ex[ex.length-1]}`;
    fs.writeFileSync(`./public${src}`,data);
    return src
}
async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            const sql = 'SELECT product_id,product_name,product_img,brand_name,category_id FROM products'
            const [rows] = await database.promise().query(sql);
            return res.status(200).send(rows)
        case "POST":
            await post(req,res)
            break;
        case "PUT":
            res.status(405)
            break;
        case "DELETE":
            break;
    }
    return res.status(400).send('incorrect method')
}
export default handler