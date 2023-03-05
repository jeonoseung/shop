import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../src/db/db";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    const sql_ui = `SELECT ui_use,ui_kind FROM main_user_interface ORDER BY ui_order`;
    const [list] = await connection.query(sql_ui);
    const data = await Promise.all(list.map(async (li:{ui_use:number,ui_kind:string}) => {
        if (li.ui_kind === 'recommend_collection') {
            const sql_component = `SELECT  ui.ui_kind,c.collection_id,c.collection_name,c.collection_router_name,c.collection_title
                            FROM recommend_collection as rec
                            INNER JOIN main_user_interface as ui on ui.ui_use = rec.rec_id
                            INNER JOIN collections as c on c.collection_id = rec.collection_id
                            LEFT JOIN recommend_collection_topic as rct ON rec.rec_id = rct.rec_id
                            WHERE rct.topic_id IS NULL
                            AND rec.rec_id = ${li.ui_use} 
                            AND ui.ui_kind = 'recommend_collection';`;
            const sql_list = `SELECT p.product_id,p.product_name,p.product_price,p.brand_name,p.discount_rate,p.product_img,COUNT(review_id) as review
                            FROM recommend_collection as rec
                            INNER JOIN collections as c ON c.collection_id = rec.collection_id
                            INNER JOIN collection_product as cp ON c.collection_id = cp.collection_id
                            INNER JOIN products as p ON cp.product_id = p.product_id
                            LEFT JOIN review as r ON p.product_id = r.product_id
                            WHERE rec.rec_id = ${li.ui_use} 
                            GROUP BY p.product_id
                            LIMIT 21;`
            const [rows] = await connection.query(sql_component+sql_list)
            return {component:rows[0][0],product:rows[1]}
        }
        else if(li.ui_kind === 'recommend_topic'){
            const sql_component = `SELECT ui.ui_kind,c.collection_name,c.collection_router_name,topic_img,topic_content
                                    FROM recommend_collection as rec
                                    INNER JOIN main_user_interface as ui ON ui.ui_use = rec.rec_id
                                    INNER JOIN recommend_collection_topic as rct ON rec.rec_id = rct.rec_id
                                    INNER JOIN collections as c ON c.collection_id = rec.collection_id
                                    WHERE rec.rec_id = ${li.ui_use} 
                                    AND ui.ui_kind = '${li.ui_kind}';`
            const sql_list = `SELECT p.product_id,p.product_name,p.product_price,p.brand_name,p.discount_rate,p.product_img
                            FROM recommend_collection as rec
                            INNER JOIN collections as c ON c.collection_id = rec.collection_id
                            INNER JOIN collection_product as cp ON c.collection_id = cp.collection_id
                            INNER JOIN products as p ON cp.product_id = p.product_id
                            WHERE rec.rec_id = ${li.ui_use} 
                            LIMIT 4;`;
            const [rows] = await connection.query(sql_component+sql_list)
            return {component:rows[0][0],product:rows[1]}
        }
        else if(li.ui_kind === 'limited_offer'){
            const sql_component = `SELECT ui.ui_kind,lo.lo_title,lo.lo_subtitle,lo_subtitle,lo_start,lo_end,lo_state
                                   FROM ${li.ui_kind} as lo
                                   INNER JOIN main_user_interface as ui on ui.ui_use = lo.lo_id
                                   INNER JOIN limited_offer_product as lop on lop.lo_id = lo.lo_id
                                   WHERE lo.lo_id = ${li.ui_use} AND ui.ui_kind = '${li.ui_kind}';`
            const sql_list = `SELECT p.product_id,p.product_name,p.product_price,p.brand_name,p.discount_rate,p.product_img,p.product_title,COUNT(review_id) as review
                              FROM ${li.ui_kind} as lo
                              INNER JOIN limited_offer_product as lop on lop.lo_id = lo.lo_id
                              INNER JOIN products as p on p.product_id = lop.product_id
                              LEFT JOIN review as r on p.product_id = r.product_id
                              WHERE lo.lo_id = ${li.ui_use}
                              GROUP BY p.product_id;`
            const [rows] = await connection.query(sql_component+sql_list)
            return {component:rows[0][0],product:rows[1]}
        }
    }))
    connection.release();
    return res.status(200).send(data)
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch (req.method){
        case "GET":
            await get(req,res)
    }
    return res.status(405).end()
}