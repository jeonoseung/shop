import {useState} from "react";
import styles from "../member.module.css";
import {UserId} from "./UserId";
import {UserPass} from "./UserPass";
import UserPassChk from "./UserPassChk";
import UserName from "./UserName";
import {UserEmail} from "./UserEmail";
import {UserPhone} from "./UserPhone";
import UserAddress from "./UserAddress";
import Gender from "./Gender";
import Birth from "./Birth";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {useMutation} from "react-query";
import {useRouter} from "next/router";
import {user} from "user";

/** 회원가입 UI */
export default function SignUpIndex({isMobile}:{isMobile:boolean}){
    const router = useRouter()
    //입력 상태값
    const [Profile, setProfile] = useState<user>({
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
    //중복 체크
    const overlap = useSelector((state:RootState)=>state.overlap)
    /** 회원 가입 요청 */
    const signUpStart = useMutation((data:user)=>axios.post('/api/member',data),{
        onSuccess:()=>{
            alert('회원 가입 되었습니다!')
            router.push({pathname:'/member/login'})
        },
        onError:()=>{
            alert('회원가입 에러')
        }
    })
    /** 회원가입 시작 */
    const signUp = async () =>{
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
        signUpStart.mutate(Profile)
    }
    return(
        <div className={styles.signup}>
            <div className={styles[isMobile ? 'mobile-signup-form' : 'signup-form']}>
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
            <div style={{textAlign:"center",marginTop:'1rem'}}>
                <button type={'button'} className={styles.event_button} onClick={signUp}>회원가입</button>
            </div>
        </div>
    )
}