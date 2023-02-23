import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";
import fs from "fs";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const {pid} = req.query;
        const select = `SELECT topic_img 
                        FROM recommend_collection as rec 
                        INNER JOIN recommend_collection_topic as rct ON rec.rec_id = rct.rec_id 
                        WHERE rec.rec_id = ${pid};`
        const [[{topic_img}]] = await connection.query(select)
        await fs.unlink(`./public${topic_img}`,(err)=>{
            if(err) throw err
        })
        const delete_rec = `DELETE FROM recommend_collection WHERE rec_id=${pid};`
        const delete_ui = `DELETE ui FROM main_user_interface ui
                           INNER JOIN(SELECT ui_id FROM main_user_interface WHERE ui_use = ${pid}) temp
                           ON temp.ui_id = ui.ui_id;`
        await connection.query(delete_rec+delete_ui)
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