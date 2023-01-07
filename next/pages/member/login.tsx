import public_styles from '../../styles/public.module.css';
import styles from '../../styles/member.module.css';
import Login from "../../src/components/Member/login";

export default function login(){
    return(
        <div className={public_styles.content}>
            <Login />
        </div>
    )
}