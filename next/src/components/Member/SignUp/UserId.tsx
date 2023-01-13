import styles from "../../../../styles/member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import {RegExp} from "../../../function/RegExp";
interface value{
    id:string
    pass:string
    pass_chk:string
    name:string
    email:string
    phone:string
    zipcode:string
    address:string
    detail:string
    gender:string
    birth:string
}
interface props{
    value:string,
    setState:Dispatch<SetStateAction<value>>
}

export function UserId({value,setState}:props){
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {status,msg} = RegExp.UserIdCheck(e.target.value)
        status
            ? setWarning(msg)
            : setWarning('')
        setState(c=>({...c,id:e.target.value}))
    }
    const OverlapCheck=()=>{

    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>아이디</span>
            <div className={styles.signup_input_div}>
                <input type={"text"}
                       className={styles.signup_input}
                       maxLength={20} value={value}
                       onChange={Check}
                       placeholder={'아이디를 입력해주세요'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
            <button className={styles.event_button} onClick={OverlapCheck}>중복확인</button>
        </div>
    )
}