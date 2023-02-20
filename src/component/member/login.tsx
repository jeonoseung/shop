
import styles from '../../../styles/member.module.css'
import {useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {useMutation, useQueryClient} from "react-query";
import {getCookie, removeCookies} from "cookies-next";

export default function Login(){
    const router = useRouter()
    interface user{
        id:string
        pass:string
    }
    const queryClient = useQueryClient()
    const [user, setUser] = useState<user>({
        id:'',
        pass:''
    })
    const startLogin = useMutation((value:user)=>axios.post(`/api/member/login`,value),{
        onSuccess:()=>{
            const {redirect} = router.query
            redirect ? router.push(redirect as string) : router.push('/')
            queryClient.invalidateQueries('user')
            getCookie('cart') ? removeCookies('cart') : null
        },
        onError:()=>{
            alert('아이디 또는 비밀번호를 다시 확인 해주세요')
        }
    })
    const userLogin = async () =>{
        if(user.id === '' || user.pass === '')
        {
            alert('아이디 또는 비밀번호를 입력 해주세요');
            return false;
        }
        startLogin.mutate(user)
    }
    return(
        <div className={styles.login}>
            <div className={styles.login_form}>
                <h2 className={styles.title}>로그인</h2>
                <input type="text" className={styles.user_input}
                       value={user.id} autoComplete={'false'} placeholder={'아이디'}
                       onChange={(e)=>setUser({...user,id:e.target.value})}
                       onKeyUp={(e)=>e.key === "Enter" ? userLogin() : null}/>
                <input type="password" className={styles.user_input}
                       value={user.pass} autoComplete={'false'} placeholder={'비밀번호'}
                       onChange={(e)=>setUser({...user,pass:e.target.value})}
                       onKeyUp={(e)=>e.key === "Enter" ? userLogin() : null}/>
                <div className={styles.user_find}>
                    <span>아이디 찾기</span>
                    <span className={styles.find_space}>|</span>
                    <span>비밀번호 찾기</span>
                </div>
                <button type={'button'} className={styles.login_button} onClick={userLogin}>
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
