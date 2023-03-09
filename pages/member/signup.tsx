import SignUp from "../../src/component/member/SignUp/index";
import public_styles from '../../styles/public.module.css';

/** 회원 가입 페이지 */
export default function signup(){
    return(
        <div className={public_styles.content}>
            <SignUp />
        </div>
    )
}