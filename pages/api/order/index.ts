import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../src/db/db";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from '../../../src/function/api/iron-session/options'
import {DateTimeNow} from "../../../src/function/public/date";
import {CartListType} from "cart-type";


const get = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const sql = `SELECT phg.phg_id,phg.price,order_date,phg.length,phg.user_id,
                    (SELECT p.product_name FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS product_name,
                    (SELECT p.product_img FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS product_img,
                    (SELECT p.brand_name FROM products as p INNER JOIN purchase_history as ph ON p.product_id = ph.product_id WHERE phg_id = phg.phg_id limit 1) AS brand_name
                    FROM purchase_history_group as phg
                    INNER JOIN purchase_history as ph
                    ON phg.phg_id = ph.phg_id
                    WHERE phg.user_id = ${req.query.user ? req.query.user : req.session.user.id}
                    GROUP BY phg.phg_id ORDER BY order_date desc`;
        const [rows] = await connection.query(sql)
        connection.release()
        return res.status(200).send(rows)
    }catch (err){
        connection.release()
        return res.status(500).send('get-try-catch')
    }
}
const post = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const list = req.body.list
        const total = req.body.total
        const user = req.session.user
        const pidLi = list.map(({product_id}:CartListType)=>product_id)
        let sqlGroup = `INSERT INTO purchase_history_group(price,order_date,length,user_id) VALUE(${total.total},'${DateTimeNow()}',${list.length},${user.id})`
        const [rows] = await connection.query(sqlGroup)
        let sql = `INSERT INTO purchase_history(product_id,user_id,count,price,discount_price,phg_id,product_name) VALUES`
        const values = list.reduce((query:string,li:CartListType,index:number)=>{
            query += `(${li.product_id},${req.session.user.id},${li.count},${li.product_price},${(li.product_price*(li.discount_rate === 0 ? 0 : li.discount_rate * 0.01))},${rows.insertId},'${li.product_name}')` + (list.length-1 === index ? `;` : ',')
            return query
        },``)
        await connection.query(sql+values)
        const remove = `DELETE c FROM cart c INNER JOIN(SELECT cart_id FROM cart WHERE product_id IN (${String(pidLi)}) AND user_id = ${user.id}) temp ON temp.cart_id = c.cart_id`
        await connection.query(remove)
        connection.release()
        return res.status(201).end();
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).send('post-try-catch');
    }

}
export default withIronSessionApiRoute(
    async function handler(req:NextApiRequest,res:NextApiResponse){
        if(!req.session.user && !req.query.user)
        {
            return res.status(403).send('need login')
        }
        switch (req.method)
        {
            case "GET":
                await get(req,res);
                break;
            case "POST":
                await post(req,res);
                break;
        }
        return res.status(405).end()
    },
    IronSessionOption
)
