import {ChangeEventHandler, Dispatch,SetStateAction, useState} from "react";
import styles from "../member.module.css";

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
    chk:string
}

export default function UserPassChk({value, setState, chk}:props){
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.currentTarget.value !==  chk
            ? setWarning('동일한 비밀번호 입력이 필요합니다')
            : setWarning('')
        setState(c=>({...c,pass_chk:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>비밀번호 확인</span>
            <div className={styles.signup_input_div}>
                <input type={"password"} className={styles.signup_input} maxLength={20} value={value} onChange={Check} placeholder={'비밀번호를 입력해주세요'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
        </div>
    )
}