import styles from "../member.module.css";
import {ChangeEventHandler, CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";

import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
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

export default function UserAddress({address,zipcode,detail,setState}:props){
    const open = (useDaumPostcodePopup(postcodeScriptUrl))

    const Check:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setState(c=>({...c,detail:e.target.value}))
    }
    const handleComplete = (data:any) => {
        setState(c=>({...c,address:data.address,zipcode:data.zonecode}))
    };
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    const handlePostCode = (data:any) => {

    }
    const [apiStyle,setApiStyle] = useState<CSSProperties>({
        display:"none",
        position: "absolute",
        top: "45%",
        left:'50%',
        width: "100%",
        maxWidth:"500px",
        height: "500px",
        transform:'translate(-50%,-50%)',
        border:'1px solid #ddd',
        background:"white",
        zIndex:'30'
    });
    const SearchAddress=()=>{
        apiStyle.display === "none"
            ? setApiStyle(c=>({...c,display:'block'}))
            : setApiStyle(c=>({...c,display:'none'}))
    }
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>주소</span>
            <div className={styles.signup_input_div}>
                <input type={'text'} className={styles.signup_zipcode} value={zipcode} disabled={true}/>
                <input type={'text'} className={styles.signup_input} value={address} disabled={true}/>
                <input type={'text'} className={styles.signup_input} value={detail} onChange={Check}/>
            </div>
            <button className={styles.event_button} onClick={handleClick}>주소 찾기</button>
        </div>
    )
}