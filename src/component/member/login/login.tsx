
import styles from '../member.module.css'
import {useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {useMutation, useQueryClient} from "react-query";

/** 로그인 UI */
export default function Login(){
    const router = useRouter()
    interface user{
        id:string
        pass:string
    }
    interface cart{
        product:number
        count:number
    }
    const queryClient = useQueryClient()
    //아이디 비밀번호 상태값
    const [user, setUser] = useState<user>({
        id:'',
        pass:''
    })
    /** 로그인 요청 */
    const startLogin = useMutation((data:{user:user,cart:cart})=>axios.post(`/api/member/login`,data),{
        onSuccess:()=>{
            const {redirect} = router.query
            //정상적으로 요청 완료 시 로그인 이전 페이지로 돌아감
            redirect ? router.push(redirect as string) : router.push('/')
            //기존 장바구니 목록 삭제
            localStorage.getItem('cart')
                ? localStorage.removeItem('cart')
                : null
            queryClient.invalidateQueries('user')
            queryClient.invalidateQueries('cart-li')
        },
        onError:()=>{
            alert('아이디 또는 비밀번호를 다시 확인 해주세요')
        }
    })
    /** 로그인 시작 */
    const userLogin = async () =>{
        if(user.id === '' || user.pass === '')
        {
            alert('아이디 또는 비밀번호를 입력 해주세요');
            return false;
        }
        //로그인 시 비회원 상태의 장바구니 목록이 있으면 같이 보내기
        const storage = localStorage.getItem('cart')
        const cart = JSON.parse(storage as string)
        const data = {user,cart}
        startLogin.mutate(data)
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
