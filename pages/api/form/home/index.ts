import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const sql_hdf = `SELECT hdf_use,hdf_kind FROM home_display_form ORDER BY hdf_use`;
    const [list] = await connection.query(sql_hdf);
    const data = await Promise.all(list.map(async (li:{hdf_use:number,hdf_kind:string}) => {
        if (li.hdf_kind === 'sug_product') {
            const sql_c = `SELECT  hdf.hdf_kind,c.collection_id,c.collection_name,c.collection_router_name,c.collection_title
                            FROM sug_product as sp
                            INNER JOIN home_display_form as hdf on hdf.hdf_use = sp.sp_id
                            INNER JOIN collections as c on c.collection_id = sp.collection_id
                            WHERE sp.sp_id = ${li.hdf_use};`;
            const sql = `SELECT p.product_id,p.product_name,p.product_price,p.brand_name,p.discount_rate,p.product_img
                            FROM sug_product as sp
                            INNER JOIN collections as c ON c.collection_id = sp.collection_id
                            INNER JOIN collection_product as cp ON c.collection_id = cp.collection_id
                            INNER JOIN products as p ON cp.product_id = p.product_id
                            WHERE sp.sp_id = ${li.hdf_use} LIMIT 21;`
            const [rows] = await connection.query(sql_c+sql)
            connection.release();
            return {collection:rows[0][0],product:rows[1]}
        }
    }))
    return res.status(200).send(data)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}