import public_styles from '../../../styles/public.module.css';
import styles from '../../../styles/member.module.css'
import {ChangeEvent, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getSession} from "../../function/api/get/api";

interface user{
    [name:string]:string
    id:string
    pass:string
}

export default function Login(){
    const Router = useRouter()
    const [user, setUser] = useState<user>({
        id:'',
        pass:''
    })
    const ValueChange = (e:ChangeEvent<HTMLInputElement>,key:string) =>{
        const copy = {...user}
        copy[key] = e.target.value;
        setUser(copy)
    }
    const UserLogin = async () =>{

        if(user.id === '' || user.pass === '')
        {
            alert('아이디 또는 비밀번호를 입력 해주세요');
            return false;
        }

        const obj = JSON.stringify(user)

        const result = await axios.post(`/api/member/login/${obj}`,user).catch(({response})=>{
            alert(response.data.msg)
            return false
        })

        result ? window.location.href = '/' : null
    }
    return(
        <div className={styles.login}>
            <div className={styles.login_form}>
                <h2 className={styles.title}>로그인</h2>
                <input type="text" className={styles.user_input}
                       value={user.id} autoComplete={'false'} placeholder={'아이디'}
                       onChange={(e)=>ValueChange(e,'id')}
                />
                <input type="password" className={styles.user_input}
                       value={user.pass} autoComplete={'false'} placeholder={'비밀번호'}
                       onChange={(e)=>ValueChange(e,'pass')}
                />
                <div className={styles.user_find}>
                    <span>아이디 찾기</span>
                    <span className={styles.find_space}>|</span>
                    <span>비밀번호 찾기</span>
                </div>
                <button type={'button'} className={styles.login_button} onClick={UserLogin}>
                    로그인
                </button>
                <Link href={'/member/signup'}>
                    <button className={styles.signup_button}>
                        회원 가입
                    </button>
                </Link>
            </div>
        </div>
    )
}