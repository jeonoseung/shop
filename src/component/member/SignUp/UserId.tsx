import styles from "../member.module.css";
import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import {RegExp} from "../../../function/RegExp";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setOverLapID} from "../../../../store/member/overlap-check";
import {RootState} from "../../../../store/store";
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

/** 사용자 아이디 UI */
export function UserId({value,setState}:props){
    const dispatch = useDispatch()
    const overlap = useSelector((state:RootState)=>state.overlap.id)
    //양식에 맞지 않을 시 경고 메시지 출력
    const [warning,setWarning] = useState<string>('')
    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        //중복확인을 성공적으로 완료 했는데 값을 변경하면 초기화
        dispatch(setOverLapID(false))
        const {status,msg} = RegExp.UserIdCheck(e.target.value)
        status
            ? setWarning(msg)
            : setWarning('')
        setState(c=>({...c,id:e.target.value}))
    }
    /** 중복확인 요청 */
    const OverlapCheck = async ()=>{
        const {data} = await axios.get(`/api/member/overlap-check/login-id/${value}`)
        if(data.overlap)
        {
            alert("이미 사용중인 아이디입니다")
        }
        else
        {
            alert("사용 가능한 아이디입니다.")
            dispatch(setOverLapID(true))
        }
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
            <div className={styles['button-div']}>
                <button className={overlap || warning !== '' ? styles['event-button__disabled'] : styles.event_button}
                        onClick={OverlapCheck} disabled={overlap || warning !== ''}>중복확인</button>
            </div>
        </div>
    )
}