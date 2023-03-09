import publicStyles from '../../styles/public.module.css';
import Login from "../../src/component/member/login/login";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import {checkUserAgent} from "../../src/function/public/public";

/**
 * 로그인 페이지
 * */
export default function LoginPage({isMobile}:{isMobile:boolean}){
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
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
                isMobile:checkUserAgent(req.headers['user-agent'] as string)
            },
        };
    },
    IronSessionOption
);