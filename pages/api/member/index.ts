import {NextApiRequest, NextApiResponse} from "next";
import {con, database} from "../../../src/db/db";
import {RegExp} from "../../../src/function/RegExp";
import bcrypt from "bcrypt";
import {replaceString} from "../../../src/function/public/public";

const BadRequest400 = (res:NextApiResponse,parameter:string,error:string,type:string,msg:string,value:string)=>{
    return res.status(400).json({parameter:parameter, error:error,type:type,msg:msg, value:value})
}

const post = async (req:NextApiRequest,res:NextApiResponse) =>{
    const connection = await con()
    try{
        const {id,pass,pass_chk,name,email,phone,address,gender,birth,detail,zipcode} = req.body
        const ID = RegExp.UserIdCheck(id);
        ID.status ?
            BadRequest400(res,"id",'InputError','RegExp',`아이디 - ${ID.msg}`,id) : null;
        const PASS = RegExp.UserPassCheck(pass);
        PASS.status ?
            BadRequest400(res,"pass",'InputError','RegExp',`비밀번호 - ${PASS.msg}`,pass) : null;

        const PASS_CHECK = RegExp.UserPassCheckRe(pass,pass_chk);
        PASS_CHECK.status ?
            BadRequest400(res,"pass_check",'InputError','RegExp',`비밀번호 - ${PASS_CHECK.msg}`,pass_chk) : null;

        const NAME = RegExp.UserNameCheck(name);
        NAME.status ?
            BadRequest400(res,"name",'InputError','RegExp',`이름 - ${NAME.msg}`,name) : null;

        const EMAIL = RegExp.UserEmailCheck(email);
        EMAIL.status ?
            BadRequest400(res,"email",'InputError','RegExp',`${EMAIL.msg}`,email) : null;

        const PHONE = RegExp.UserPhoneCheck(phone);
        PHONE.status ?
            BadRequest400(res,"phone",'InputError','RegExp',`${PHONE.msg}`,phone) : null;

        const ADDRESS = RegExp.UserAddressCheck(address);
        ADDRESS.status ?
            BadRequest400(res,"address",'InputError','null',`${ADDRESS.msg}`,address) : null;

        const GENDER = RegExp.UserGenderCheck(gender);
        GENDER.status ?
            BadRequest400(res,"gender",'InputError','null',`${GENDER.msg}`,gender) : null;

        const BIRTH = RegExp.UserBirthCheck(birth);
        BIRTH.status ?
            BadRequest400(res,"birth",'InputError','null',`${BIRTH.msg}`,birth) : null;
        const password = await bcrypt.hash(pass,10)
        const sql = `INSERT INTO user(user_login_id,user_login_password,user_authority,user_name,user_address,user_phone,user_email,user_gender,user_birth)
                    VALUE('${id}','${password}','${3}','${name}',"${zipcode+"_"+address+"_"+replaceString(detail)}",'${phone}','${email}','${gender}','${birth}');`
        await database.query(sql);
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