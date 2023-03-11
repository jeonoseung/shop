import styles from "../../member.module.css";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import {ChangeEventHandler, Dispatch, SetStateAction} from "react";

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
    address:string,
    zipcode:string
    detail:string
    setState:Dispatch<SetStateAction<value>>
}

export default function MobileUserAddress({address,zipcode,detail,setState}:props){
    const open = (useDaumPostcodePopup(postcodeScriptUrl))

    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setState(c=>({...c,detail:e.target.value}))
    }
    /** 주소 찾기 완료 시 */
    const handleComplete = (data:any) => {
        setState(c=>({...c,address:data.address,zipcode:data.zonecode}))
    };
    /** 주소 찾기 api 요청 */
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    return(
        <div className={styles.input_div}>
            <div className={styles['mobile-title']}>
                <span className={styles.title_div}>주소</span>
                <button className={styles.event_button} style={{maxWidth:'100px',height:'30px'}} onClick={handleClick}>주소 찾기</button>
            </div>
            <div className={styles.signup_input_div}>
                <input type={'text'} className={styles.signup_zipcode} value={zipcode} disabled={true}/>
                <input type={'text'} className={styles.signup_input} value={address} disabled={true}/>
                <input type={'text'} className={styles.signup_input} value={detail} onChange={Check}/>
            </div>
        </div>
    )
}