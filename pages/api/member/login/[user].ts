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
const post = async (req:NextApiRequest,res:NextApiResponse)=>{
    const connection = await con()
    try{
        const user = req.body
        const [rows] = await connection.query(`SELECT user_id, user_login_id, user_authority,user_name, user_login_password FROM user WHERE user_login_id = '${user.id}'`)
        if(rows.length === 1)
        {
            const result = await bcrypt.compare(user.pass,rows[0].user_login_password)
            if(result)
            {
                const row = rows[0]
                req.session.user = {
                    id:row.user_id,
                    login_id:row.user_login_id,
                    auth:row.user_authority,
                    name:row.user_name
                }
                await req.session.save();
                connection.release()
                res.status(200).send({user:req.session.user})
            }
            else
            {
                connection.release()
                ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
            }
        }
        else
        {
            connection.release()
            ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
        }
    }catch (err){
        connection.release()
        return res.status(500).end()
    }
}
export default withIronSessionApiRoute(
    async function UserLogin(req,res){
        switch (req.method){
            case "POST":
                await post(req,res)
        }
        return res.status(405).end()
    },
    IronSessionOption
)
