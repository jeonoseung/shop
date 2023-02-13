import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const {pid} = req.query;
        const sql = `DELETE FROM main_user_interface WHERE ui_id = ${pid}`
        await connection.query(sql)
        connection.release();
        return res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release();
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