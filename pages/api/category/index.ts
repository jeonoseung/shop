import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch (req.method)
    {
        case "GET":
            const [rows] = await database.promise().query("SELECT * FROM category")
            res.status(200).send(rows)
            break;
    }
}