import styles from '../../../styles/member.module.css'
import {useState} from "react";

export default function Login(){
    const [UserId, setUserId] = useState<string>();
    const [UserPass, setUserPass] = useState<string>();

    return(
        <div className={styles.login}>
            <div className={styles.login_form}>
                <h2 className={styles.title}>로그인</h2>
                <input type="text" className={styles.user_input} value={UserId} autoComplete={'false'} placeholder={'아이디'}/>
                <input type="password" className={styles.user_input} value={UserPass} autoComplete={'false'} placeholder={'비밀번호'}/>
                <div className={styles.user_find}>
                    <span>아이디 찾기</span>
                    <span className={styles.find_space}>|</span>
                    <span>비밀번호 찾기</span>
                </div>
                <button className={styles.login_button}>
                    로그인
                </button>
                <button className={styles.signup_button}>
                    회원 가입
                </button>
            </div>
        </div>
    )
}