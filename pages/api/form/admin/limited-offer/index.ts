import {NextApiRequest, NextApiResponse} from "next";
import {con} from "../../../../../src/db/db";
import {LimitedChecked} from "ui-form-type";
import {replaceString} from "../../../../../src/function/public/public";

interface PostBody{
    title:string
    subtitle:string
    start:string
    end:string
    checked:LimitedChecked[]
}

const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con();
    try{
        const {title,subtitle,start,end,checked}:PostBody = req.body;

        const lo_sql = `INSERT INTO limited_offer(lo_title,lo_subtitle,lo_start,lo_end,lo_state) 
                                       VALUE("${replaceString(title as string)}",
                                       '${replaceString(subtitle as string)}',
                                       '${replaceString(start as string)}',
                                       '${replaceString(end as string)}',0)`;
        const [lo_insert] = await connection.query(lo_sql)
        const lop_sql = `INSERT INTO limited_offer_product(lo_id,product_id) VALUES`
        const values = checked.reduce((sql:string,{product_id},index:number)=>{
            const value = `(${lo_insert.insertId},${product_id})`
            const end = index === checked.length-1 ? `;` : `,`
            return sql+(value+end);
        },'')

        const temporary_sql = `INSERT INTO products_discount_temporary(product_id,discount_rate,lo_discount_rate,lo_id) VALUES`
        const temporary_values = checked.reduce((sql:string,{product_id,discount_rate,set_discount},index:number)=>{
            const value = `(${product_id},${discount_rate},${set_discount},${lo_insert.insertId})`
            const end = index === checked.length-1 ? ';' : ','
            return sql+(value+end);
        },'')

        const start_sql = `CREATE EVENT IF NOT EXISTS lo_start_${lo_insert.insertId}
                           ON SCHEDULE AT '${start}'
                           ON COMPLETION NOT PRESERVE
                           DO CALL start_lo(${lo_insert.insertId});`
        const end_sql = `CREATE EVENT IF NOT EXISTS lo_end_${lo_insert.insertId}
                         ON SCHEDULE AT '${end}'
                         ON COMPLETION NOT PRESERVE
                         DO CALL remove_lo(${lo_insert.insertId});`
        await connection.query((temporary_sql+temporary_values)+lop_sql+values+start_sql+end_sql)
        connection.release()
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