import styles from "../member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import {RegExp} from "../../../function/RegExp";
import axios from "axios";
import {setOverLapEmail} from "../../../../store/member/overlap-check";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
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
/** 사용자 이메일 */
export function UserEmail({value,setState}:props){
    const dispatch = useDispatch();
    const overlap = useSelector((state:RootState)=>state.overlap.email)
    //양식에 맞지않는 값이면 메시지 표시
    const [warning,setWarning] = useState<string>('')
    /** 양식 검사 */
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        //중복확인을 성공적으로 완료했는데 값을 변경 시 초기화
        dispatch(setOverLapEmail(false))

        const {status,msg} = RegExp.UserEmailCheck(e.target.value)
        status
            ? setWarning(msg)
            : setWarning('')
        setState(c=>({...c,email:e.target.value}))
    }
    /** 이메일 중복확인 요청 */
    const OverlapCheck = async ()=>{
        const {data} = await axios.get(`/api/member/overlap-check/email/${value}`)
        if(data.overlap)
        {
            alert("이미 사용중인 이메일입니다")
        }
        else
        {
            alert("사용 가능한 이메일입니다.")
            dispatch(setOverLapEmail(true))
        }
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>이메일</span>
            <div className={styles.signup_input_div}>
                <input type={"text"} className={styles.signup_input} maxLength={30} value={value} onChange={Check} placeholder={'예:test1234@naver.com'}/>
                <span className={styles.warning}>{warning}</span>
            </div>
            <button className={overlap || warning !== '' ? styles['event-button__disabled'] : styles.event_button}
                    onClick={OverlapCheck} disabled={overlap || warning !== ''}>중복확인</button>
        </div>
    )
}