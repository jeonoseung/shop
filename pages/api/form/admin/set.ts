import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con();
    const ui = `SELECT ui_id, ui_order,ui_use,ui_kind,ui_name FROM main_user_interface ORDER BY ui_order;`
    const collection = `SELECT c.collection_id,c.collection_name FROM recommend_collection as rc 
                        INNER JOIN collections as c on rc.collection_id = c.collection_id;`
    const topic = `SELECT c.collection_id,c.collection_name FROM recommend_topic as rt 
                   INNER JOIN collections as c on rt.collection_id = c.collection_id;`
    const [rows] = await connection.query(ui+collection+topic);
    return res.status(200).send({form:rows[0],collection:rows[1],topic:rows[2]})
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            await get(req,res)
            break;
    }

    return res.status(405).end()
}