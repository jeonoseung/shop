import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getOrderDetail} from "../../../src/function/api/get/api";
import {useEffect} from "react";
import {useRouter} from "next/router";
import publicStyles from "../../../styles/public.module.css";
import styles from "../../../src/component/my-page/my-page.module.css";
import MenuList from "../../../src/component/my-page/menu-list";
import OrderList from "../../../src/component/my-page/order-list";
import OrderDetailList from "../../../src/component/my-page/order-detail-list";

export default function OrderDetail(){

    return(
        <div className={publicStyles['content']}>
            <div className={styles['my-page']}>
                <div>
                    <MenuList />
                </div>
                <div>
                    <OrderDetailList />
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const phg_id:string = (context.params?.phg_id as string)
        const user = context.req.session.user

        if(!user)
        {
            return {
                redirect: {
                    permanent:false,
                    destination:`/member/login?redirect=/my-page/order/${context.params}`
                }
            }
        }
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('order-detail-li',()=>getOrderDetail(true,phg_id,user.id))
        return {
            props:{
                dehydratedState: dehydrate(queryClient)
            }
        };
    },
    IronSessionOption
);