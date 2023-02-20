import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import Spinner from "../../src/component/public/spinner";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useQueryClient} from "react-query";

export default function LogoutPage(){
    const queryClient = useQueryClient();
    const router = useRouter();
    useEffect(()=>{
        queryClient.invalidateQueries('user')
        router.replace('/')
    },[])
    return(
        <div>
            <Spinner/>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        req.session.destroy();
        return {
            props:{
            }
        };
    },
    IronSessionOption
);