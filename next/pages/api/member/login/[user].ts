import {NextApiRequest, NextApiResponse} from "next";
import ResponseClass from "../../../../src/function/api/Response";
const bcrypt = require('bcrypt');
const db = require('../../../../src/db/db')
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

export default withIronSessionApiRoute(
    async function UserLogin(req,res){
        if(req.method === "POST")
        {
            const user = req.body
            const [rows] = await db.promise().query(`SELECT user_id, user_login_id, user_authority,user_name, user_login_password FROM user WHERE user_login_id = '${user.id}'`)
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
                    res.status(200).send({user:req.session.user})
                }
                else
                {
                    ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
                }
            }
            else
                ResponseClass.BadRequest204(res,'user-data','아이디 또는 비밀번호 확인 필요')
        }
    },
    IronSessionOption
)
