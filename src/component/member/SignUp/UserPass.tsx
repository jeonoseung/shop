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
    zipcode:string,
    address:string,
    detail:string,
    gender:string,
    birth:string,
}
interface props{
    value:string,
    setState:Dispatch<SetStateAction<value>>
}
/** 사용자 비밀번호 UI */
export function UserPass({value,setState}:props){
    //양식에 맞지않는 값 입력 시 경고 메시지 출력
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {status,msg} = RegExp.UserPassCheck(e.target.value);
        status
            ? setWarning(msg)
            : setWarning('')
        setState(c=>({...c,pass:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>비밀번호</span>
            <div className={styles.signup_input_div}>
                <input type={"password"} className={styles.signup_input} maxLength={20} value={value} onChange={Check} placeholder={'비밀번호를 입력해주세요'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
        </div>
    )
}