// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect';
import multer from "multer";
const bcrypt = require('bcrypt');
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorHandler} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler";
import {RegExp} from "../../../src/function/RegExp";
const db = require('../../../src/db/db')
export const config = {
    api: {
        bodyParser: false
    }
};

const n = nc();

n.use(multer().none())

const BadRequest400 = (res:NextApiResponse,parameter:string,error:string,type:string,msg:string,value:string)=>{
    return res.status(400).json({parameter:parameter, error:error,type:type,msg:msg, value:value})
}

n.post(async (req:NextApiRequest,res:NextApiResponse)=>{
    const data = JSON.parse(req.body.data)
    try{
        const ID = RegExp.UserIdCheck(data.id);
        ID.status ?
            BadRequest400(res,"id",'InputError','RegExp',`아이디 - ${ID.msg}`,data.id) : null;

        const PASS = RegExp.UserPassCheck(data.pass);
        PASS.status ?
            BadRequest400(res,"pass",'InputError','RegExp',`비밀번호 - ${PASS.msg}`,data.pass) : null;

        const PASS_CHECK = RegExp.UserPassCheckRe(data.pass,data.pass_chk);
        PASS_CHECK.status ?
            BadRequest400(res,"pass_check",'InputError','RegExp',`비밀번호 - ${PASS_CHECK.msg}`,data.pass_chk) : null;

        const NAME = RegExp.UserNameCheck(data.name);
        NAME.status ?
            BadRequest400(res,"name",'InputError','RegExp',`이름 - ${NAME.msg}`,data.name) : null;

        const EMAIL = RegExp.UserEmailCheck(data.email);
        EMAIL.status ?
            BadRequest400(res,"email",'InputError','RegExp',`${EMAIL.msg}`,data.email) : null;

        const PHONE = RegExp.UserPhoneCheck(data.phone);
        PHONE.status ?
            BadRequest400(res,"phone",'InputError','RegExp',`${PHONE.msg}`,data.phone) : null;

        const ADDRESS = RegExp.UserAddressCheck(data.address);
        ADDRESS.status ?
            BadRequest400(res,"address",'InputError','null',`${ADDRESS.msg}`,data.address) : null;

        const GENDER = RegExp.UserGenderCheck(data.gender);
        GENDER.status ?
            BadRequest400(res,"gender",'InputError','null',`${GENDER.msg}`,data.gender) : null;

        const BIRTH = RegExp.UserBirthCheck(data.birth);
        BIRTH.status ?
            BadRequest400(res,"birth",'InputError','null',`${BIRTH.msg}`,data.birth) : null;

    }catch (err){
        return res.status(400).json({message:err})
    }
    try {
        const password = await bcrypt.hash(data.pass,10)
        const sql = `INSERT INTO user(user_login_id,user_login_password,user_authority,user_name,user_address,user_phone,user_email,user_gender,user_birth)
                    VALUE('${data.id}','${password}','${3}','${data.name}','${data.zipcode+'_'+data.address+'_'+data.detail}','${data.phone}','${data.email}','${data.gender}','${data.birth}');`

        db.query(sql,(err:ErrorHandler | undefined)=>{
            if(err)
            {
                throw Error('sql 에러')
            }
        })
        return res.status(200).json({msg:'회원가입 완료'})
    }catch (err){
        return res.status(500).json({msg:'try-catch'})
    }
})
export default n

