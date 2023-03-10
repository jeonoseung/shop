import styles from "../member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import {RegExp} from "../../../function/RegExp";

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

/** 사용자 휴대전화번호 UI */
export function UserPhone({value,setState}:props){
    //양식에 맞지않는 값 입력 시 경고 메시지 출력
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        //숫자만 입력되게
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        const {status,msg} = RegExp.UserPhoneCheck(e.target.value)
        status
            ? setWarning(msg)
            : setWarning('')
        setState(c=>({...c,phone:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>전화번호</span>
            <div className={styles.signup_input_div}>
                <input type={"text"} className={styles.signup_input} maxLength={11} value={value} onChange={Check} placeholder={'숫자만 입력해주세요'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
        </div>
    )
}