import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const {pid} = req.query;
        const delete_rec = `DELETE FROM recommend_collection WHERE rec_id = ${pid};`
        const delete_ui = `DELETE ui FROM main_user_interface ui
                           INNER JOIN(SELECT ui_id FROM main_user_interface WHERE ui_use = ${pid} AND ui_kind = 'recommend_collection') temp
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