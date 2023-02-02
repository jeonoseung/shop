import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../../src/db/db";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from '../../../src/function/api/iron-session/options'
import DateTimeNow from "../../../src/function/public/date-time-now";

interface postList{
    product_id:number
    count:number
    price:number
    discount_price:number
}

const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    // if(!req.session.user)
    // {
    //     return res.status(403).send({msg:'need login'})
    // }
    try{
        const sql = `SELECT phg.phg_id,phg.price,order_date,phg.length,
                    (SELECT p.product_name FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS product_name,
                    (SELECT p.product_img FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS product_img,
                    (SELECT p.brand_name FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS brand_name
                    FROM purchase_history_group as phg
                    INNER JOIN purchase_history as ph
                    ON phg.phg_id = ph.phg_id
                    WHERE phg.user_id = ${req.session.user.id}
                    GROUP BY phg.phg_id`;
        const [rows] = await database.promise().query(sql)
        return rows
    }catch (err){
        return false;
    }
}
const post = async (req:NextApiRequest,res:NextApiResponse) =>{
    try{
        const list = req.body.list
        const total = req.body.total
        const user = req.session.user
        let sqlGroup = `INSERT INTO purchase_history_group(price,order_date,length,user_id) VALUE(${total.total},'${DateTimeNow()}',${list.length},${user.id})`
        const [rows] = await database.promise().query(sqlGroup)
        let sql = `INSERT INTO purchase_history(product_id,user_id,count,price,discount_price,phg_id) VALUES`
        const values = list.reduce((query:string,li:postList,index:number)=>{
            query += `(${li.product_id},${req.session.user.id},${li.count},${li.price},${li.discount_price},${rows.insertId})` + (list.length-1 === index ? `;` : ',')
            return query
        },``)
        const result = await database.promise().query(sql+values)
        return true;
    }catch (err){
        return false;
    }

}
export default withIronSessionApiRoute(
    async function handler(req:NextApiRequest,res:NextApiResponse){
        console.log(1)
        switch (req.method)
        {
            case "GET":
                const Get = await get(req,res);
                return res.status(200).send(Get)

            case "POST":
                const checkPost = await post(req,res);
                if(checkPost)
                {
                    return res.status(201).end()
                }
                else
                {
                    return res.status(400).end()
                }
            case "PUT":
                break;
            case "DELETE":
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)
