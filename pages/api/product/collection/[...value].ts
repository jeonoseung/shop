import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../../src/db/db";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method)
    {
        case "GET":
            const {value} = req.query;
            if(!value || value.length != 2) return res.status(400);
            const category = value[0];
            const search = value[1];
            const sql = `SELECT product_id,product_name,product_img FROM products ${search}`


            const [rows] = await database.promise().query(sql)
            return res.status(200).send(rows)
    }

    return res.status(400);
}