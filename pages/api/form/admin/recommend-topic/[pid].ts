import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";
import fs from "fs";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const table = 'recommend_topic'
        const {pid} = req.query;
        const [rows] = await connection.query(`SELECT rec_image FROM ${table} WHERE rec_id = ${pid}`)
        await fs.unlink(`./public${rows[0].rec_image}`,(err)=>{
            if(err) throw err
        })
        const sql = `DELETE FROM ${table} WHERE rec_id=${pid};`
        const remove = `DELETE FROM main_user_interface
                        WHERE ui_id = 
                        (SELECT C.ui_id 
                        FROM (SELECT ui_id FROM main_user_interface WHERE ui_use = ${pid} AND ui_kind = '${table}')
                        AS C)`;
        await connection.query(sql+remove)
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