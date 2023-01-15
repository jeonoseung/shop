import SignUp from "../../src/component/member/SignUp/index";
import public_styles from '../../styles/public.module.css';
import styles from "../../styles/member.module.css";
import {UserId} from "../../src/component/member/SignUp/UserId";

export default function signup(){
    return(
        <div className={public_styles.content}>
            <SignUp />
        </div>
    )
}