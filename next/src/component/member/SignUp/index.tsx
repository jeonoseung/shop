import {useEffect, useState} from "react";
import p_styles from "../../../../styles/public.module.css"
import styles from "../../../../styles/member.module.css";
import {UserId} from "./UserId";
import {UserPass} from "./UserPass";
import UserPassChk from "./UserPassChk";
import UserName from "./UserName";
import {UserEmail} from "./UserEmail";
import {UserPhone} from "./UserPhone";
import UserAddress from "./UserAddress";
import Gender from "./Gender";
import Birth from "./Birth";
import FormData from "form-data";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

export default function SignUpIndex(){
    const [Profile, setProfile] = useState({
        id:'',
        pass:'',
        pass_chk:'',
        name:'',
        email:'',
        phone:'',
        zipcode:'',
        address:'',
        detail:'',
        gender:'',
        birth:''
    })
    const overlap = useSelector((state:RootState)=>state.overlap)
    const test = async () =>{
        if(!overlap.id)
        {
            alert("아이디 중복 확인이 필요합니다")
            return false;
        }
        else if(!overlap.email)
        {
            alert("이메일 중복 확인이 필요합니다")
            return false;
        }

        const form:FormData = new FormData()
        form.append("data",JSON.stringify(Profile))
        const result:any = axios.post('/api/member/1',form,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        result.catch(({response}:any)=>{
            alert(response.data.msg)
            return false
        })
        result ? window.location.href = '/member/login' : null
    }
    return(
        <div className={styles.signup}>
            <div className={styles.signup_form}>
                <UserId value={Profile.id} setState={setProfile}/>
                <UserPass value={Profile.pass} setState={setProfile}/>
                <UserPassChk value={Profile.pass_chk} setState={setProfile} chk={Profile.pass}/>
                <UserName value={Profile.name} setState={setProfile}/>
                <UserEmail value={Profile.email} setState={setProfile}/>
                <UserPhone value={Profile.phone} setState={setProfile}/>
                <UserAddress address={Profile.address} zipcode={Profile.zipcode} detail={Profile.detail} setState={setProfile}/>
                <Gender value={Profile.gender} setState={setProfile}/>
                <Birth value={Profile.birth} setState={setProfile}/>
            </div>
            <button type={'button'} className={styles.event_button} onClick={test}>회원가입</button>
        </div>
    )
}