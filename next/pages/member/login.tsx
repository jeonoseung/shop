import public_styles from '../../styles/public.module.css';
import styles from '../../styles/member.module.css';
import Login from "../../src/component/member/login";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getSession} from "../../src/function/api/get/api";

export default function LoginPage(){
    return(
        <div className={public_styles.content}>
            <Login />
        </div>
    )
}