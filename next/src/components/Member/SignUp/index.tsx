import {useState} from "react";
import styles from "../../../../styles/member.module.css";
import {UserId} from "./UserId";
import {UserPass} from "./UserPass";
import UserPassChk from "./UserPassChk";
import UserName from "./UserName";
import {UserEmail} from "./UserEmail";
import {UserPhone} from "./UserPhone";
import UserAddress from "./UserAddress";
import Gender from "./Gender";
import Birth from "./Birth";

export default function SignUpIndex(){
    const [Profile, setProfile] = useState({
        id:'',
        pass:'',
        pass_chk:'',
        name:'',
        email:'',
        phone:'',
        zipcode:'',
        address:'',
        detail:'',
        gender:'',
        birth:''
    })
    const test = () =>{
        console.log(Profile)
    }
    return(
        <div className={styles.signup}>
            <div className={styles.signup_form}>
                <UserId value={Profile.id} setState={setProfile}/>
                <UserPass value={Profile.pass} setState={setProfile}/>
                <UserPassChk value={Profile.pass_chk} setState={setProfile} chk={Profile.pass}/>
                <UserName value={Profile.name} setState={setProfile}/>
                <UserEmail value={Profile.email} setState={setProfile}/>
                <UserPhone value={Profile.phone} setState={setProfile}/>
                <UserAddress address={Profile.address} zipcode={Profile.zipcode} detail={Profile.detail} setState={setProfile}/>
                <Gender value={Profile.gender} setState={setProfile}/>
                <Birth value={Profile.birth} setState={setProfile}/>
            </div>
            <button onClick={test}></button>
        </div>
    )
}