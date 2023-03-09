import SignUp from "../../src/component/member/SignUp/index";
import publicStyles from '../../styles/public.module.css';
import {withIronSessionSsr} from "iron-session/next";
import {checkUserAgent} from "../../src/function/public/public";
import {IronSessionOption} from "../../src/function/api/iron-session/options";

/** 회원 가입 페이지 */
export default function signup({isMobile}:{isMobile:boolean}){
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <SignUp isMobile={isMobile}/>
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