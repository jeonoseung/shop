import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";

const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try {
        const {pid} = req.body;
        const sql = `INSERT INTO recommend_collection(collection_id) VALUE(${pid})`
        await connection.query(sql)
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