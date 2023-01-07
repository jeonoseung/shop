import styles from "../../../../styles/member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
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
    value:string
    setState:Dispatch<SetStateAction<value>>
}

export default function Birth({value,setState}:props){
    const [set, setStart] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('');
    const [birth, setBirth] = useState({year:'', month:'', day:''})

    const Check_Y:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        setBirth(c=>({...c,year:e.target.value}))
    }
    const Check_M:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        setBirth(c=>({...c,month:e.target.value}))
    }
    const Check_D:ChangeEventHandler<HTMLInputElement> = (e) =>{
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        setBirth(c=>({...c,day:e.target.value}))
    }
    useEffect(()=>{
        if(set)
        {
            setState(c=>({...c,birth:`${birth.year}/${birth.month}/${birth.day}`}))
            const date = new Date();
            const year = date.getFullYear();
            parseInt(birth.year) < year-120 ? setWarning('출생연도를 다시 확인 해주세요'):
                parseInt(birth.year) > year-14 ? setWarning('14세 미만은 회원가입이 불가합니다'):
                    parseInt(birth.month) > 12 || parseInt(birth.month) < 1 ? setWarning('출생월를 다시 확인 해주세요'):
                        parseInt(birth.day) > 31 || parseInt(birth.day) < 1 ? setWarning('출생일를 다시 확인 해주세요'):
                            setWarning('')
        }
        else setStart(true)
    },[birth])
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>생년월일</span>
            <div className={styles.signup_input_div}>
                <div className={styles.birth_div}>
                    <input type={'text'} maxLength={4} placeholder={'YYYY'} value={birth.year} onChange={Check_Y} className={styles.y_input}/>
                    <span>/</span>
                    <input type={'text'} maxLength={2} placeholder={'MM'} value={birth.month} onChange={Check_M} className={styles.md_input}/>
                    <span>/</span>
                    <input type={'text'} maxLength={2} placeholder={'DD'} value={birth.day} onChange={Check_D} className={styles.md_input}/>
                </div>
                <span className={styles.warning}>{warning}</span>
            </div>
            <button className={styles.event_button}>중복확인</button>
        </div>
    )
}