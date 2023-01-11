import styles from "../../../../styles/member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
interface value{
    id:string,
    pass:string,
    pass_chk:string,
    name:string,
    email:string,
    phone:string,
    zipcode:string
    address:string
    detail:string
    gender:string,
    birth:string
}
interface props{
    value:string,
    setState:Dispatch<SetStateAction<value>>
}
export function UserEmail({value,setState}:props){
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const test = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        !test.test(e.target.value)
            ? setWarning('올바른 이메일 형식이 아닙니다')
            : setWarning('')
        setState(c=>({...c,email:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>이메일</span>
            <div className={styles.signup_input_div}>
                <input type={"text"} className={styles.signup_input} maxLength={30} value={value} onChange={Check} placeholder={'예:test1234@naver.com'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
            <button className={styles.event_button}>중복확인</button>
        </div>
    )
}