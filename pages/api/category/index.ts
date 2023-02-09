import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";

const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    const [rows] = await connection.query("SELECT * FROM category")
    connection.release();
    res.status(200).send(rows)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch (req.method)
    {
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}