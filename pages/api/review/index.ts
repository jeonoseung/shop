import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import fs from "fs";
import {con} from "../../../src/db/db";
import * as formidable from "formidable";
import {Files} from "formidable";
import {DateTimeNow} from "../../../src/function/public/date";

export const config = {
    api:{
        bodyParser:false
    }
}
const saveFile = async (file:any)=>{
    const data = fs.readFileSync(file.filepath);
    const ex = file.originalFilename.split('.');
    const src = `/review/r-img-${Date.now()}.${ex[ex.length-1]}`;
    fs.writeFileSync(`./public${src}`,data);
    return src
}
const post = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const form = new formidable.IncomingForm();
        const result:{data:string,files:Files} = await new Promise(async (resolve,reject)=>{
            await form.parse(req,async (err,fields,files)=>{
                if (err) return reject(err)
                const {data} = fields
                resolve({data:data as string,files})
            })
        })
        const {data,files} = result;
        const src:string = files.file ? await saveFile(files.file) : ''
        const {ph,product,comment} = JSON.parse(data)
        const sql = `INSERT INTO review(product_id,review_comment,review_img,ph_id,review_date) 
                                 VALUES(${product},'${comment}','${src}',${ph},'${DateTimeNow()}');`
        const state = `UPDATE purchase_history SET review_state = 1 WHERE ph_id = ${ph}`
        await connection.query(sql+state)
        connection.release()
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}
export default withIronSessionApiRoute(
    async function handler (req:NextApiRequest,res:NextApiResponse){
        switch (req.method){
            case "POST":
                await post(req,res)
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)
