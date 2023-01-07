import styles from "../../../../styles/member.module.css";
import {Dispatch, SetStateAction} from "react";
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
export default function Gender({value,setState}:props){
    const gender = ['남','여']
    return(
        <div className={styles.input_div}>
            <span className={styles.title_div}>성별</span>
            <div className={styles.signup_radio}>
                {gender.map(item=>(
                    <label key={item} className={styles.radio_label}>
                        <input type={'radio'}
                               name={'gender'}
                               value={item}
                               onChange={(e)=>e.target.checked ?
                                   setState(c=>({...c,gender:e.target.value})):null}
                               className={styles.gender_radio}/>
                        <div className={styles.radio}><div className={styles.radio_in}></div></div>
                        <span>{item}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}