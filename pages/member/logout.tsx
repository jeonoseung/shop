import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import {useEffect} from "react";
import {useQueryClient} from "react-query";
import {useRouter} from "next/router";

/** 로그아웃 페이지 */
export default function LogoutPage(){
    const queryClient = useQueryClient();
    const router = useRouter()
    /** 저장된 query값 리셋 및 메인 홈으로 페이지 이동 */
    useEffect(()=>{
        queryClient.clear()
        router.push('/')
    },[])
    return(
        <div>
            {/*<Spinner/>*/}
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        //세션 데이터 파괴
        req.session.destroy();
        return {
            props:{
            }
        };
    },
    IronSessionOption
);