import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";
import * as formidable from "formidable";
import fs from "fs";
import {replaceString} from "../../../../../src/function/public/public";

export const config = {
    api:{
        bodyParser:false
    }
}
const saveFile = async (file:any)=>{
    const data = fs.readFileSync(file.filepath);
    const ex = file.originalFilename.split('.');
    const src = `/recommend-topic/rt-img-${Date.now()}.${ex[ex.length-1]}`;
    fs.writeFileSync(`./public${src}`,data);
    return src
}
const post = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con();
    try{
        const form = new formidable.IncomingForm();
        const result:{fields:{pid:string,content:string},files:any} = await new Promise(async (resolve, reject) => {
            await form.parse(req, async (err, fields, files) => {
                if (err) return reject(err)
                resolve({fields:JSON.parse(fields.data as string), files})
            })
        })
        const src = await saveFile(result.files.file)
        const {pid,content} = result.fields;
        const sql = `INSERT INTO recommend_collection(collection_id) VALUE(${pid})`
        const [{insertId}] = await connection.query(sql)
        const topic = `INSERT INTO recommend_collection_topic(topic_content,topic_img,rec_id) VALUE("${replaceString(content as string)}",'${src}',${insertId})`
        await connection.query(topic)
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
        case "POST":
            await post(req,res)
            break;
    }

    return res.status(405).end()
}