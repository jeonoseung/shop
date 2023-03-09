import public_styles from '../../styles/public.module.css';
import Login from "../../src/component/member/login";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";

/**
 * 로그인 페이지
 * */
export default function LoginPage(){
    return(
        <div className={public_styles.content}>
            <Login />
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }){
        const user = req.session.user;
        if (user) {
            return {
                redirect: {
                    permanent:false,
                    destination:"/"
                }
            };
        }
        return {
            props: {

            },
        };
    },
    IronSessionOption
);