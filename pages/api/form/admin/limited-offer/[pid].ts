import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";

const Delete = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const {pid} = req.query;
        const sql = `CALL remove_lo(${pid});`;
        const remove_event = `DROP EVENT IF EXISTS lo_start_${pid};DROP EVENT IF EXISTS lo_end_${pid}`
        await connection.query(sql+remove_event)
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