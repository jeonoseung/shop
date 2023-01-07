import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import styles from "../../../../styles/member.module.css";
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
export default function UserName({value,setState}:props){
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.target.value === ''
            ? setWarning('이름을 입력 해주세요')
            : setWarning('')
        setState(c=>({...c,name:e.target.value}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>이름</span>
            <div className={styles.signup_input_div}>
                <input type={"text"} className={styles.signup_input} maxLength={20} value={value} onChange={Check} placeholder={'이름을 입력해주세요'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
        </div>
    )
}