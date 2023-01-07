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

export function UserPhone({value,setState}:props){
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value === ''
            ? setWarning('전화번호를 입력해주세요')
            : setWarning('')
        setState(c=>({...c,phone:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>전화번호</span>
            <div className={styles.signup_input_div}>
                <input type={"text"} className={styles.signup_input} maxLength={11} value={value} onChange={Check} placeholder={'숫자만 입력해주세요'}/>
            </div>
            <button className={styles.event_button}>본인인증</button>
            <div></div>
            <div>
                <span className={styles.warning}>{warning}</span>
            </div>
        </div>
    )
}