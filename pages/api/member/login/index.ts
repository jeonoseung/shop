import {NextApiRequest, NextApiResponse} from "next";
import ResponseClass from "../../../../src/function/api/Response";
import {con} from "../../../../src/db/db";
const bcrypt = require('bcrypt');
import { withIronSessionApiRoute } from "iron-session/next";
import {IronSessionOption} from "../../../../src/function/api/iron-session/options";

declare module "iron-session" {
    interface IronSessionData {
        user:{
            id:number
            login_id:string
            auth:number
            name:string
        }
    }
}
const get = async (req:NextApiRequest,res:NextApiResponse)=>{
    if(req.session.user){
        return res.status(200).send(true)
    }
    else{
        return res.status(200).send(false)
    }
}
const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const {id,pass} = req.body
        const sql = `SELECT user_id, user_login_id, user_authority,user_name, user_login_password FROM user WHERE user_login_id = '${id}'`
        const [[userInfo]] = await connection.query(sql)
        const {user_id,user_login_id,user_authority,user_name} = userInfo;
        if(!userInfo)
        {
            connection.release()
            ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
        }
        const result = await bcrypt.compare(pass,userInfo.user_login_password)
        if(!result)
        {
            connection.release()
            ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
        }
        if(req.cookies.cart){
            const localCart = JSON.parse(req.cookies.cart as string)
            const sql = `INSERT INTO cart(product_id,user_id) VALUES`
            const values = localCart.reduce((sql:string,li:{product:number,count:number},index:number)=>{
                let value = ''
                for(let i=0;i<li.count;i++){
                    value += `(${li.product},${user_id})` + (index === localCart.length-1 && i === li.count-1 ? ';' : ',')
                }
                return sql+value
            },'')
            await connection.query(sql+values)
        }
        req.session.user = {
            id:user_id,
            login_id:user_login_id,
            auth:user_authority,
            name:user_name
        }
        await req.session.save();
        connection.release()
        res.status(201).end()
    }catch (err){
        console.log(err)
        connection.release()
        return res.status(500).end()
    }
}
export default withIronSessionApiRoute(
    async function UserLogin(req,res){
        switch (req.method){
            case "GET":
                await get(req,res)
            case "POST":
                await post(req,res)
        }
        return res.status(405).end()
    },
    IronSessionOption
)
