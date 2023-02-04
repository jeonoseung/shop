import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/my-page/my-page.module.css'
import MenuList from "../../../src/component/my-page/menu-list";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import OrderList from "../../../src/component/my-page/order-list";
import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {getCategory, getOrderList} from "../../../src/function/api/get/api";
import {database} from "../../../src/db/db";

export default function MyOrder(){
    return(
        <div className={publicStyles['content']}>
            <div className={styles['my-page']}>
                <div>
                    <MenuList />
                </div>
                <div>
                    <OrderList />
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context){
        const user = context.req.session.user
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('order-li',()=>getOrderList(true,user.id))
        if(!user)
        {
            return {
                redirect: {
                    permanent:false,
                    destination:`/member/login?redirect=/my-page/order`
                }
            }
        }
        return {
            props:{
                dehydratedState: dehydrate(queryClient)
            }
        };
    },
    IronSessionOption
);