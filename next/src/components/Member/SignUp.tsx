import styles from '../../../styles/member.module.css';
import {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useState} from "react";

export default function SignUp(){
    const [InputValue, setValue] = useState({
        id:'',
        password:'',
        password_check:'',
        name:'',
        email:'',
        phone:'',
        address:'',
        gender:'',
        year:'',
        month:'',
        day:''
    })
    const [UserId, setUserId] = useState<string>('');
    const [UserPass,setUserPass] = useState<string>();
    const test = () =>{
        console.log(InputValue)
    }
    const input = [
        {
            title:'아이디',
            html:<input type={'text'} value={InputValue.id} className={styles.signup_input}
                        onChange={(e)=> setValue({...InputValue,id:e.target.value})} placeholder={'아이디를 입력 해주세요'}/>,
            event:<button className={styles.event_button} onClick={test}>중복확인</button>},
        {
            title:'비밀번호',
            html: <input type={'password'} value={InputValue.password} className={styles.signup_input}
                         onChange={(e)=> setValue({...InputValue,password:e.target.value})} placeholder={'비밀번호를 입력 해주세요'}/>,
            event:null},
        {
            title:'비밀번호확인',
            html: <input type={'password'} value={InputValue.password_check} className={styles.signup_input}
                         onChange={(e)=> setValue({...InputValue,password_check:e.target.value})} placeholder={'비밀번호를 한번 더 입력 해주세요'}/>,
            event:null},
        {
            title:'이름',
            html: <input type={'text'} value={InputValue.name} className={styles.signup_input}
                         onChange={(e)=> setValue({...InputValue,name:e.target.value})} placeholder={'이름을 입력 해주세요'}/>,
            event:null},
        {
            title:'이메일',
            html: <input type={'text'} value={InputValue.email} className={styles.signup_input}
                         onChange={(e)=> setValue({...InputValue,email:e.target.value})} placeholder={'예:test1234@naver.com'}/>,
            event:null},
        {
            title:'휴대폰',
            html: <input type={'text'} value={InputValue.phone} className={styles.signup_input}
                         onChange={(e)=> setValue({...InputValue,phone:e.target.value})} placeholder={'숫자만 입력해주세요'}/>,
            event:null},
    ]
    return(
        <div className={styles.signup}>
            <div className={styles.signup_form}>
                {input.map((item,index)=>(
                    <div key={index} className={styles.input_div}>
                        <span className={styles.title_div}>
                            {item.title}
                        </span>
                        <div>
                            {item.html}
                        </div>
                        <div className={styles.event_button_div}>
                            {item.event}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
