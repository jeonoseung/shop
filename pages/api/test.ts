import { withIronSessionApiRoute } from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../src/db/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    // const connection = await con()
    try{
        // await connection.query(`DELETE ui
        //                         FROM main_user_interface ui
        //                         INNER JOIN(
        //                         SELECT ui_id
        //                         FROM main_user_interface as mui
        //                         INNER JOIN recommend_collection as rc ON mui.ui_use = rc.rec_id
        //                         WHERE rc.collection_id = 18 AND ui_kind = 'recommend_collection'
        //                         ) temp ON temp.ui_id = ui.ui_id;`)
        return res.status(200).send('ok')
    }catch (err){
        console.log(err)
        return res.status(200).send('error')
    }
}

// export default withIronSessionApiRoute(
//     async function handler(req,res){
//         req.session.destroy();
//         res.send({ ok: true });
//     },
//     IronSessionOption
// )

