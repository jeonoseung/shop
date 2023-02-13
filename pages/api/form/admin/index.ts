import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con();
    try{
        const ui = `SELECT ui_id,ui_use,ui_kind,ui_name FROM main_user_interface ORDER BY ui_order;`
        const collection = `SELECT c.collection_id,c.collection_name,rc.rec_id FROM recommend_collection as rc 
                        INNER JOIN collections as c on rc.collection_id = c.collection_id;`
        const topic = `SELECT c.collection_id,c.collection_name,rt.rec_id FROM recommend_topic as rt 
                   INNER JOIN collections as c on rt.collection_id = c.collection_id;`
        const limited = `SELECT * FROM limited_offer as lo`
        const [rows] = await connection.query(ui+collection+topic+limited);
        connection.release()
        return res.status(200).send({form:rows[0],collection:rows[1],topic:rows[2],limited:rows[3]})
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}
const put = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const list = req.body;
        const connection = await con();
        const reset = `TRUNCATE main_user_interface;`
        const sql = `INSERT INTO main_user_interface(ui_order,ui_use,ui_kind,ui_name) VALUES`
        let values = ``;
        list.map((li:any,index:number)=>{
            values += `(${index+1},${li.ui_use},'${li.ui_kind}','${li.ui_name}')`;
            values += list.length-1 === index ? `;` :`,`;
        })
        await connection.query(reset+sql+values)
        connection.release()
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case "GET":
            await get(req,res)
            break;
        case "PUT":
            await put(req,res)
            break;
    }

    return res.status(405).end()
}