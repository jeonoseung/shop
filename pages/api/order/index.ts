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
export default withIronSessionApiRoute(
    async function handler(req:NextApiRequest,res:NextApiResponse){
        if(!req.session.user)
        {
            return res.status(403).send({msg:'need login'})
        }
        switch (req.method)
        {
            case "GET":
                break;
            case "POST":
                const list = req.body.list
                const total = req.body.total
                let sqlGroup = `INSERT INTO purchase_history_group(price,order_date,length) VALUE(${total.total},'${DateTimeNow()}',${list.length})`
                const [rows] = await database.promise().query(sqlGroup)
                let sql = `INSERT INTO purchase_history(product_id,user_id,count,price,discount_price,phg_id) VALUES`
                const values = list.reduce((query:string,li:postList,index:number)=>{
                    query += `(${li.product_id},${req.session.user.id},${li.count},${li.price},${li.discount_price},${rows.insertId})` + (list.length-1 === index ? `;` : ',')
                    return query
                },``)
                const result = await database.promise().query(sql+values)
                return res.status(201).end()
            case "PUT":
                break;
            case "DELETE":
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)
